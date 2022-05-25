// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import {TokenLogic} from "../TokenLogic.sol";
import {IToken, TokenStandard} from "../../IToken.sol";
import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {TransferData} from "../../../extensions/IExtension.sol";
import {TokenRoles} from "../../../utils/roles/TokenRoles.sol";
import {ERC1820Client} from "../../../utils/erc1820/ERC1820Client.sol";
import {ERC1820Implementer} from "../../../utils/erc1820/ERC1820Implementer.sol";
import {BytesLib} from "solidity-bytes-utils/contracts/BytesLib.sol";
import {ERC20TokenInterface} from "../../registry/ERC20TokenInterface.sol";
import {TokenEventManager} from "../../eventmanager/TokenEventManager.sol";
import {ERC20ProtectedTokenData} from "./IERC20Logic.sol";

/**
 * @title Extendable ERC20 Logic
 * @notice An ERC20 logic contract that implements the IERC20 interface. This contract
 * can be deployed as-is.
 *
 * @dev This logic contract inherits from OpenZeppelin's ERC20Upgradeable, TokenLogic and ERC20TokenInterface.
 * This meaning it supports the full ERC20 spec along with any OpenZeppelin (or other 3rd party) contract extensions.
 * You may inherit from this logic contract to add additional functionality.
 *
 * Any additional functions added to the logic contract through a child contract that is not explictly declared in the
 * proxy contract may be overriden by registered & enabled extensions. To prevent this, explictly declare the new function
 * in the proxy contract and forward the call using delegated function modifier
 *
 * All transfer events (including minting/burning) trigger a transfer event to all registered
 * and enabled extensions. By default, no data (or operatorData) is passed to extensions. The
 * functions transferWithData and transferFromWithData allow a caller to pass data to extensions during
 * these transfer events. This is done through the {ExtendableHooks._triggerTokenTransfer} function inside
 * the {ERC20Logic._afterTokenTransfer} function. The _afterTokenTransfer function was chosen to follow
 * the checks, effects and interactions pattern
 *
 */
contract ERC20Logic is ERC20TokenInterface, TokenLogic, ERC20Upgradeable {
    using BytesLib for bytes;

    bytes private _currentData;
    bytes private _currentOperatorData;
    address private _currentOperator;

    /**
     * @dev The storage slot that will be used to store the ProtectedTokenData struct inside
     * this TokenProxy
     */
    bytes32 internal constant ERC20_PROTECTED_TOKEN_DATA_SLOT =
        bytes32(uint256(keccak256("erc20.token.meta")) - 1);

    /**
     * @dev Get the ProtectedTokenData struct stored in this contract
     */
    function _getProtectedTokenData()
        internal
        pure
        returns (ERC20ProtectedTokenData storage r)
    {
        bytes32 slot = ERC20_PROTECTED_TOKEN_DATA_SLOT;
        assembly {
            r.slot := slot
        }
    }

    /**
     * @dev We don't need to do anything here
     */
    function _onInitialize(bytes memory initData)
        internal
        virtual
        override
        returns (bool)
    {
        if (initData.length > 0) {
            _init(initData);
        }

        return true;
    }

    function _init(bytes memory data) internal initializer {
        (
            string memory name_,
            string memory symbol_,
            bool allowMint,
            bool allowBurn,
            uint256 maxSupply_
        ) = abi.decode(data, (string, string, bool, bool, uint256));

        ERC20ProtectedTokenData storage m = _getProtectedTokenData();
        m.name = name_;
        m.symbol = symbol_;
        m.maxSupply = maxSupply_;
        m.allowMint = allowMint;
        m.allowBurn = allowBurn;
        m.initialized = true;

        __ERC20_init_unchained(name_, symbol_);
    }

    /**
     * @dev This function is invoked directly before each token transfer. This is overriden here
     * so we can invoke the transfer event on all registered & enabled extensions. We do this
     * by building a TransferData object and invoking _triggerBeforeTokenTransfer
     * @param from The sender of this token transfer
     * @param to The recipient of this token transfer
     * @param amount How many tokens were transferred
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        address operator = _msgSender();
        if (_currentOperator != address(0)) {
            operator = _currentOperator;
        }

        TransferData memory data = TransferData(
            address(this),
            _msgData(),
            0x00000000000000000000000000000000,
            operator,
            from,
            to,
            amount,
            0,
            _currentData,
            _currentOperatorData
        );

        _triggerTokenBeforeTransferEvent(data);
    }

    /**
     * @dev This function is invoked directly after each token transfer. This is overriden here
     * so we can invoke the transfer event on all registered & enabled extensions. We do this
     * by building a TransferData object and invoking _triggerTokenTransfer
     * @param from The sender of this token transfer
     * @param to The recipient of this token transfer
     * @param amount How many tokens were transferred
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        address operator = _msgSender();
        if (_currentOperator != address(0)) {
            operator = _currentOperator;
        }

        TransferData memory data = TransferData(
            address(this),
            _msgData(),
            0x00000000000000000000000000000000,
            operator,
            from,
            to,
            amount,
            0,
            _currentData,
            _currentOperatorData
        );

        _currentData = "";
        _currentOperatorData = "";
        _currentOperator = address(0);

        _triggerTokenTransferEvent(data);
    }

    /**
     * @dev Mints `amount` tokens and sends to `to` address.
     * Only an address with the Minter role can invoke this function
     * @param to The recipient of the minted tokens
     * @param amount The amount of tokens to be minted
     */
    function mint(address to, uint256 amount)
        external
        virtual
        onlyMinter
        returns (bool)
    {
        bytes memory extraData = _extractExtraCalldata(MINT_CALL_SIZE);
        _currentData = extraData;
        _currentOperatorData = extraData;

        _mint(to, amount);

        require(
            totalSupply() <= _getProtectedTokenData().maxSupply,
            "Max supply has been exceeded"
        );

        return true;
    }

    /**
     * @dev Destroys `amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     * @param amount The amount of tokens to burn
     */
    function burn(uint256 amount) public virtual returns (bool) {
        bytes memory extraData = _extractExtraCalldata(BURN_CALL_SIZE);
        _currentData = extraData;
        _currentOperatorData = extraData;

        _burn(_msgSender(), amount);
        return true;
    }

    /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     * @param account The account to burn from
     * @param amount The amount of tokens to burn
     */
    function burnFrom(address account, uint256 amount)
        public
        virtual
        returns (bool)
    {
        bytes memory extraData = _extractExtraCalldata(BURNFROM_CALL_SIZE);
        _currentData = extraData;
        _currentOperatorData = extraData;

        _spendAllowance(account, _msgSender(), amount);
        _burn(account, amount);

        return true;
    }

    /**
     * @dev Executes a controlled transfer where the sender is `td.from` and the recipeint is `td.to`.
     * Only token controllers can use this funciton
     * @param td The TransferData containing the kind of transfer to perform
     */
    function tokenTransfer(TransferData calldata td)
        external
        virtual
        override
        onlyControllers
        returns (bool)
    {
        require(td.partition == bytes32(0), "Invalid transfer data: partition");
        require(td.token == address(this), "Invalid transfer data: token");
        require(td.tokenId == 0, "Invalid transfer data: tokenId");

        _currentData = td.data;
        _currentOperatorData = td.operatorData;
        _currentOperator = td.operator;
        _transfer(td.from, td.to, td.value);

        return true;
    }

    /**
     * @dev This will always return {TokenStandard.ERC20}
     */
    function tokenStandard() external pure override returns (TokenStandard) {
        return TokenStandard.ERC20;
    }

    // Override normal transfer functions
    // That way we can grab any extra data
    // that may be attached to the calldata
    uint256 private constant MINT_CALL_SIZE = 4 + 32 + 32;
    uint256 private constant BURN_CALL_SIZE = 4 + 32;
    uint256 private constant BURNFROM_CALL_SIZE = 4 + 32 + 32;
    uint256 private constant APPROVE_CALL_SIZE = 4 + 32 + 32;
    uint256 private constant TRANSFER_CALL_SIZE = 4 + 32 + 32;
    uint256 private constant TRANSFER_FROM_CALL_SIZE = 4 + 32 + 32 + 32;

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     * @param recipient The recipient of the transfer
     * @param amount The amount of tokens to transfer
     */
    function transfer(address recipient, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        bytes memory extraData = _extractExtraCalldata(TRANSFER_CALL_SIZE);
        _currentData = extraData;
        _currentOperatorData = extraData;

        return ERC20Upgradeable.transfer(recipient, amount);
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     * @param sender The sender of tokens
     * @param recipient The recipient of the tokens
     * @param amount The amount of tokens to transfer
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        bytes memory extraData = _extractExtraCalldata(TRANSFER_FROM_CALL_SIZE);
        _currentData = extraData;
        _currentOperatorData = extraData;

        return ERC20Upgradeable.transferFrom(sender, recipient, amount);
    }

    function approve(address spender, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        super.approve(spender, amount);

        bytes memory extraData = _extractExtraCalldata(APPROVE_CALL_SIZE);

        TransferData memory data = TransferData(
            address(this),
            _msgData(),
            0x00000000000000000000000000000000,
            _msgSender(),
            _msgSender(),
            spender,
            amount,
            0,
            extraData,
            extraData
        );
        _triggerTokenApprovalEvent(data);

        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue)
        public
        virtual
        override
        returns (bool)
    {
        super.increaseAllowance(spender, addedValue);
        uint256 amount = super.allowance(_msgSender(), spender) + addedValue;

        bytes memory extraData = _extractExtraCalldata(APPROVE_CALL_SIZE);

        TransferData memory data = TransferData(
            address(this),
            _msgData(),
            0x00000000000000000000000000000000,
            _msgSender(),
            _msgSender(),
            spender,
            amount,
            0,
            extraData,
            extraData
        );
        _triggerTokenApprovalEvent(data);

        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        virtual
        override
        returns (bool)
    {
        super.decreaseAllowance(spender, subtractedValue);
        uint256 amount = super.allowance(_msgSender(), spender) -
            subtractedValue;

        bytes memory extraData = _extractExtraCalldata(APPROVE_CALL_SIZE);

        TransferData memory data = TransferData(
            address(this),
            _msgData(),
            0x00000000000000000000000000000000,
            _msgSender(),
            _msgSender(),
            spender,
            amount,
            0,
            extraData,
            extraData
        );
        _triggerTokenApprovalEvent(data);

        return true;
    }

    /**
     * @notice Returns true if minting is allowed on this token, otherwise false
     */
    function mintingAllowed() external view returns (bool) {
        return _getProtectedTokenData().allowMint;
    }

    /**
     * @notice Returns true if burning is allowed on this token, otherwise false
     */
    function burningAllowed() external view returns (bool) {
        return _getProtectedTokenData().allowBurn;
    }

    /**
     * @notice Returns the maximum value the totalSupply() can be for this token
     */
    function maxSupply() external view returns (uint256) {
        return _getProtectedTokenData().maxSupply;
    }

    /**
     * This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[48] private __gap;
}
