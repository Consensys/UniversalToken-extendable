// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20Proxy} from "./IERC20Proxy.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Logic} from "../../logic/ERC20/IERC20Logic.sol";
import {IToken, TransferData, TokenStandard} from "../../IToken.sol";
import {ExtendableTokenProxy} from "../ExtendableTokenProxy.sol";
import {ERC20TokenInterface} from "../../registry/ERC20TokenInterface.sol";
import {BytesLib} from "solidity-bytes-utils/contracts/BytesLib.sol";
import {RolesBase} from "../../../utils/roles/RolesBase.sol";
import {DomainAware} from "../../../utils/DomainAware.sol";
import {TokenProxy} from "../TokenProxy.sol";

/**
 * @title Extendable ERC20 Proxy
 * @author Eddie Penta
 * @notice An ERC20 proxy contract that implements the IERC20 interface. This contract
 * can be deployed as-is, however it is recommended to use the ERC20 contract
 * for more deployment options (such as minting an inital supply).
 * You must provide a token logic contract address that implements the ERC20TokenLogic interface.
 *
 * The mint and burn/burnFrom functions can be toggled on/off during deployment. To check if mint/burn/burnFrom
 * are enabled, check the ProtectedTokenData.
 *
 * @dev This proxy contract inherits from ExtendableTokenProxy and ERC20TokenInterface, meaning
 * it supports the full ERC20 spec and extensions that support ERC20. All ERC20 functions
 * are declared explictely and are always forwarded to the current ERC20 token logic contract.
 *
 * All transfer events (including minting/burning) trigger a transfer event to all registered
 * and enabled extensions. By default, no data (or operatorData) is passed to extensions. The
 * functions transferWithData and transferFromWithData allow a caller to pass data to extensions during
 * these transfer events
 *
 * The domain name of this contract is the ERC20 token name()
 */
contract ERC20Proxy is ERC20TokenInterface, ExtendableTokenProxy, IERC20Proxy {
    using BytesLib for bytes;

    /**
     * @dev The storage slot that will be used to store the ProtectedTokenData struct inside
     * this TokenProxy
     */
    bytes32 internal constant ERC20_PROTECTED_TOKEN_DATA_SLOT =
        bytes32(uint256(keccak256("erc20.token.meta")) - 1);

    /**
     * @notice Protected ERC20 token metadata stored in the proxy storage in a special storage slot.
     * Includes thing such as name, symbol and deployment options.
     * @dev This struct should only be written to inside the constructor and should be treated as readonly.
     * Solidity 0.8.7 does not have anything for marking storage slots as read-only, so we'll just use
     * the honor system for now.
     * @param initialized Whether this proxy is initialized
     * @param name The name of this ERC20 token
     * @param symbol The symbol of this ERC20 token
     * @param maxSupply The max supply of token allowed
     * @param allowMint Whether minting is allowed
     * @param allowBurn Whether burning is allowed
     */
    struct ProtectedTokenData {
        bool initialized;
        string name;
        string symbol;
        uint256 maxSupply;
        bool allowMint;
        bool allowBurn;
    }

    /**
     * @notice Deploy a new ERC20 Token Proxy with a given token logic contract. You must
     * also provide the token's name/symbol, max supply, owner and whether token minting or
     * token buning is allowed
     * @dev The constructor stores the ProtectedTokenData and updates the domain seperator
     * @param _name The name of the new ERC20 Token
     * @param _symbol The symbol of the new ERC20 Token
     * @param _allowMint Whether the mint function will be enabled on this token
     * @param _allowBurn Whether the burn/burnFrom function will be enabled on this token
     * @param _owner The owner of this ERC20 Token
     * @param _maxSupply The max supply of tokens allowed. Must be greater-than 0
     * @param _logicAddress The logic contract address to use for this ERC20 proxy
     */
    constructor(
        string memory _name,
        string memory _symbol,
        bool _allowMint,
        bool _allowBurn,
        address _owner,
        uint256 _maxSupply,
        address _logicAddress
    ) ExtendableTokenProxy(_logicAddress, _owner) {
        require(_maxSupply > 0, "Max supply must be non-zero");

        if (_allowMint) {
            RolesBase._addRole(_owner, TOKEN_MINTER_ROLE);
        }

        ProtectedTokenData storage m = _getProtectedTokenData();
        m.name = _name;
        m.symbol = _symbol;
        m.maxSupply = _maxSupply;
        m.allowMint = _allowMint;
        m.allowBurn = _allowBurn;

        //Update the doamin seperator now that
        //we've setup everything
        DomainAware._updateDomainSeparator();

        m.initialized = true;
    }

    /**
     * @dev A function modifier to place on minting functions to ensure those
     * functions get disabled if minting is disabled
     */
    modifier mintingEnabled() {
        require(mintingAllowed(), "Minting is disabled");
        _;
    }

    /**
     * @dev A function modifier to place on burning functions to ensure those
     * functions get disabled if burning is disabled
     */
    modifier burningEnabled() {
        require(burningAllowed(), "Burning is disabled");
        _;
    }

    /**
     * @dev Get the ProtectedTokenData struct stored in this contract
     */
    function _getProtectedTokenData()
        internal
        pure
        returns (ProtectedTokenData storage r)
    {
        bytes32 slot = ERC20_PROTECTED_TOKEN_DATA_SLOT;
        assembly {
            r.slot := slot
        }
    }

    /**
     * @notice Gets the amount of tokens in existence.
     * @return the amount of tokens in existence
     */
    function totalSupply() public view override returns (uint256) {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.totalSupply.selector)
        );

        return result.toUint256(0);
    }

    /**
     * @notice Returns true if minting is allowed on this token, otherwise false
     * @return if minting is allowed on this token or not
     */
    function mintingAllowed() public view override returns (bool) {
        ProtectedTokenData storage m = _getProtectedTokenData();
        return m.allowMint;
    }

    /**
     * @notice Returns true if burning is allowed on this token, otherwise false
     * @return if burning is allowed or not
     */
    function burningAllowed() public view override returns (bool) {
        ProtectedTokenData storage m = _getProtectedTokenData();
        return m.allowBurn;
    }

    /**
     * @notice Returns the amount of tokens owned by `account`.
     * @param _account The account to check the balance of
     * @return the amount of tokens owned by `account`.
     */
    function balanceOf(address _account)
        public
        view
        override
        returns (uint256)
    {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.balanceOf.selector, _account)
        );

        return result.toUint256(0);
    }

    /**
     * @notice Returns the name of the token.
     * @return the name of the token.
     */
    function name() public view override returns (string memory) {
        return _getProtectedTokenData().name;
    }

    /**
     * @notice Returns the symbol of the token.
     * @return the symbol of the token.
     */
    function symbol() public view override returns (string memory) {
        return _getProtectedTokenData().symbol;
    }

    /**
     * @notice Returns the decimals places of the token.
     * @return the decimals places of the token.
     */
    function decimals() public view override staticdelegated returns (uint8) {}

    /**
     * @notice Execute a controlled transfer of tokens `from` -> `to`. Only addresses with
     * the token controllers role can invoke this function.
     * @return wheter the transfer succeeded or not
     */
    function tokenTransfer(TransferData calldata _td)
        external
        override
        onlyControllers
        returns (bool)
    {
        require(_td.token == address(this), "Invalid token");

        if (_td.partition != bytes32(0)) {
            return false; //We cannot do partition transfers
        }

        TokenProxy._delegateCurrentCall();
    }

    /**
     * @notice Creates `amount` new tokens for `to`.
     *
     * @dev See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     * @param _to The address to mint tokens to
     * @param _amount The amount of new tokens to mint
     * @return wheter the minting succeeded or not
     */
    /// #if_succeeds {:msg "The caller is a minter"} isMinter(_msgSender())
    /// #if_succeeds {:msg "Minting is enabled"} mintingAllowed()
    /// #if_succeeds {:msg "The to address balance increases"} old(balanceOf(to)) + amount == balanceOf(to)
    /// #if_succeeds {:msg "The total supply has increases as expected"} old(totalSupply()) + amount == totalSupply()
    /// #if_succeeds {:msg "The total supply is not bigger than the max cap"} old(totalSupply()) + amount <= _getProtectedTokenData().maxSupply
    function mint(address _to, uint256 _amount)
        public
        virtual
        override
        onlyMinter
        mintingEnabled
        delegated
        returns (bool)
    {}

    /**
     * @notice Destroys `amount` tokens from the caller.
     *
     * @dev See {ERC20-_burn}.
     * @param _amount The amount of tokens to burn from the caller.
     * @return wheter the burning succeeded or not
     */
    /// #if_succeeds {:msg "Burning is enabled"} burningAllowed()
    /// #if_succeeds {:msg "The to address has enough to burn"} old(balanceOf(_msgSender())) <= amount
    /// #if_succeeds {:msg "There's enough in total supply to burn"} old(totalSupply()) <= amount
    /// #if_succeeds {:msg "The to address balance decreased as expected"} old(balanceOf(_msgSender())) - amount == balanceOf(_msgSender())
    /// #if_succeeds {:msg "The total supply has decreased as expected"} old(totalSupply()) - amount == totalSupply()
    function burn(uint256 _amount)
        public
        virtual
        override
        burningEnabled
        delegated
        returns (bool)
    {}

    /**
     * @notice Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * @dev See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     * @param _account The account to burn from
     * @param _amount The amount of tokens to burn
     * @return wheter the burning succeeded or not
     */
    /// #if_succeeds {:msg "Burning is enabled"} burningAllowed()
    /// #if_succeeds {:msg "The to account has enough to burn"} old(balanceOf(account)) <= amount
    /// #if_succeeds {:msg "The operator is allowed to burn the amount"} old(allowance(account, _msgSender())) <= amount
    /// #if_succeeds {:msg "There's enough in total supply to burn"} old(totalSupply()) <= amount
    /// #if_succeeds {:msg "The to address balance decreased as expected"} old(balanceOf(account)) - amount == balanceOf(account)
    /// #if_succeeds {:msg "The total supply has decreased as expected"} old(totalSupply()) - amount == totalSupply()
    /// #if_succeeds {:msg "The operator's balance does not change"} old(balanceOf(_msgSender())) == balanceOf(_msgSender())
    function burnFrom(address _account, uint256 _amount)
        public
        virtual
        override
        burningEnabled
        delegated
        returns (bool)
    {}

    /**
     * @notice Moves `amount` tokens from the caller's account to `recipient`, passing arbitrary data to
     * any registered extensions.
     *
     * @dev Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     * @param _recipient The recipient of the token transfer from the caller
     * @param _amount The amount from the caller's account to transfer
     * @param _data Call data to forward
     * @return wheter the transfer with data succeeded or not
     */
    /// #if_succeeds {:msg "The sender has sufficient balance at the start"} old(balanceOf(_msgSender()) >= amount);
    /// #if_succeeds {:msg "The sender has amount less balance"} _msgSender() != recipient ==> old(balanceOf(_msgSender())) - amount == balanceOf(_msgSender());
    /// #if_succeeds {:msg "The receiver receives amount"} _msgSender() != recipient ==> old(balanceOf(recipient)) + amount == balanceOf(recipient);
    /// #if_succeeds {:msg "Transfer to self won't change the senders balance" } _msgSender() == recipient ==> old(balanceOf(_msgSender())) == balanceOf(_msgSender());
    function transferWithData(
        address _recipient,
        uint256 _amount,
        bytes calldata _data
    ) public returns (bool) {
        bytes memory normalData = abi.encodeWithSelector(
            IERC20.transfer.selector,
            _recipient,
            _amount
        );

        //append any extra data packed
        bytes memory cdata = abi.encodePacked(normalData, _data);

        (bool result, ) = TokenProxy._delegatecall(cdata);

        return result;
    }

    /**
     * @notice Moves `amount` tokens from the caller's account to `recipient`, passing arbitrary data to
     * any registered extensions.
     *
     * @dev Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     * @param _sender The sender of the token transfer
     * @param _recipient The recipient of the token transfer from the caller
     * @param _amount The amount from the caller's account to transfer
     * @param _data Call data to forward
     * @return whether the operation succeeded
     */
    /// #if_succeeds {:msg "The sender has sufficient balance at the start"} old(balanceOf(sender) >= amount);
    /// #if_succeeds {:msg "The sender has amount less balance"} _msgSender() != recipient ==> old(balanceOf(_msgSender())) - amount == balanceOf(_msgSender());
    /// #if_succeeds {:msg "The operator's balance doesnt change if its not the receiver"} _msgSender() != recipient ==> old(balanceOf(_msgSender())) == balanceOf(_msgSender());
    /// #if_succeeds {:msg "The receiver receives amount"} sender != recipient ==> old(balanceOf(recipient)) + amount == balanceOf(recipient);
    /// #if_succeeds {:msg "Transfer to self won't change the senders balance" } sender == recipient ==> old(balanceOf(recipient) == balanceOf(recipient));
    function transferFromWithData(
        address _sender,
        address _recipient,
        uint256 _amount,
        bytes calldata _data
    ) public returns (bool) {
        bytes memory cdata = abi.encodeWithSelector(
            IERC20.transferFrom.selector,
            _sender,
            _recipient,
            _amount,
            _data
        );

        (bool result, ) = TokenProxy._delegatecall(cdata);

        return result;
    }

    /**
     * @notice Moves `amount` tokens from the caller's account to `recipient`.
     *
     * @dev Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     * @param _recipient The recipient of the token transfer from the caller
     * @param _amount The amount from the caller's account to transfer
     * @return whether the the transfer succeeded
     */
    /// #if_succeeds {:msg "The sender has sufficient balance at the start"} old(balanceOf(_msgSender()) >= amount);
    /// #if_succeeds {:msg "The sender has amount less balance"} _msgSender() != recipient ==> old(balanceOf(_msgSender())) - amount == balanceOf(_msgSender());
    /// #if_succeeds {:msg "The receiver receives amount"} _msgSender() != recipient ==> old(balanceOf(recipient)) + amount == balanceOf(recipient);
    /// #if_succeeds {:msg "Transfer to self won't change the senders balance" } _msgSender() == recipient ==> old(balanceOf(_msgSender())) == balanceOf(_msgSender());
    function transfer(address _recipient, uint256 _amount)
        public
        override
        delegated
        returns (bool)
    {}

    /**
     * @notice Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * @dev Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     * @param _spender The address to approve spending the caller's tokens for
     * @param _amount The total amount of tokens the spender is approved to spend on behalf of the caller
     * @return whether the the approval succeeded
     */
    /// #if_succeeds {:msg "The spender's balance doesnt change"} old(balanceOf(spender)) == balanceOf(spender);
    /// #if_succeeds {:msg "The owner's balance doesnt change"} old(balanceOf(_msgSender())) == balanceOf(_msgSender());
    /// #if_succeeds {:msg "The spender's allowance increases as expected"} old(allowance(_msgSender(), spender)) + amount == allowance(_msgSender(), spender);
    function approve(address _spender, uint256 _amount)
        public
        override
        delegated
        returns (bool)
    {}

    /**
     * @notice Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * @dev This value changes when {approve} or {transferFrom} are called.
     * @param _owner The address of the owner that owns the tokens
     * @param _spender The address of the spender that will spend owner's tokens
     * @return the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}.
     */
    function allowance(address _owner, address _spender)
        public
        view
        override
        returns (uint256)
    {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.allowance.selector, _owner, _spender)
        );

        return result.toUint256(0);
    }

    /**
     * @notice Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * @dev Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     * @param _sender The address of the account owner the tokens will come from
     * @param _recipient The recipient of the tokens
     * @param _amount The amount of tokens to send to the recipient from the sender's account
     * @return whether the operation succeeded
     */
    /// #if_succeeds {:msg "The sender has sufficient balance at the start"} old(balanceOf(sender) >= amount);
    /// #if_succeeds {:msg "The sender has amount less balance"} _msgSender() != recipient ==> old(balanceOf(_msgSender())) - amount == balanceOf(_msgSender());
    /// #if_succeeds {:msg "The operator's balance doesnt change if its not the receiver"} _msgSender() != recipient ==> old(balanceOf(_msgSender())) == balanceOf(_msgSender());
    /// #if_succeeds {:msg "The receiver receives amount"} sender != recipient ==> old(balanceOf(recipient)) + amount == balanceOf(recipient);
    /// #if_succeeds {:msg "Transfer to self won't change the senders balance" } sender == recipient ==> old(balanceOf(recipient) == balanceOf(recipient));
    function transferFrom(
        address _sender,
        address _recipient,
        uint256 _amount
    ) public override delegated returns (bool) {}

    /**
     * @notice Atomically increases the allowance granted to `spender` by the caller.
     *
     * @dev This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * @param _spender The address that will be given the allownace increase
     * @param _addedValue How much the allowance should be increased by
     * @return whether the operation succeeded
     */
    function increaseAllowance(address _spender, uint256 _addedValue)
        public
        virtual
        override
        delegated
        returns (bool)
    {}

    /**
     * @notice Atomically decreases the allowance granted to `spender` by the caller.
     *
     * @dev This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `_spender` cannot be the zero address.
     * - `_spender` must have allowance for the caller of at least
     * `subtractedValue`.
     * @param _spender The address that will be given the allownace decrease
     * @param _subtractedValue How much the allowance should be decreased by
     * @return whether the operation succeeded
     */
    function decreaseAllowance(address _spender, uint256 _subtractedValue)
        public
        virtual
        override
        delegated
        returns (bool)
    {}

    /**
     * @dev Execute a controlled transfer of tokens `from` -> `to`.
     * @return whether the operation succeeded
     */
    function _transfer(TransferData memory _td) internal returns (bool) {
        (bool result, ) = TokenProxy._delegatecall(
            abi.encodeWithSelector(IToken.tokenTransfer.selector, _td)
        );
        return result;
    }

    /**
     * @dev Creates `_amount` new tokens for `_receipient`.
     *
     * See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     * @param _receipient The address of the receipient that will receive the minted tokens
     * @param _amount The amount of new tokens to mint
     * @return whether the operation succeeded
     */
    function _mint(address _receipient, uint256 _amount)
        internal
        returns (bool)
    {
        (bool result, ) = TokenProxy._delegatecall(
            abi.encodeWithSelector(
                IERC20Proxy.mint.selector,
                _receipient,
                _amount
            )
        );
        return result;
    }

    /**
     * @dev Destroys `_amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     * @param _amount The amount of tokens to burn from the caller.
     * @return whether the operation succeeded
     */
    function _burn(uint256 _amount) internal returns (bool) {
        (bool result, ) = TokenProxy._delegatecall(
            abi.encodeWithSelector(IERC20Proxy.burn.selector, _amount)
        );
        return result;
    }

    /**
     * @dev Destroys `_amount` tokens from `_account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     * @param _account The account to burn from
     * @param _amount The amount of tokens to burn
     * @return whether the operation succeeded
     */
    function _burnFrom(address _account, uint256 _amount)
        internal
        returns (bool)
    {
        (bool result, ) = TokenProxy._delegatecall(
            abi.encodeWithSelector(
                IERC20Proxy.burnFrom.selector,
                _account,
                _amount
            )
        );
        return result;
    }

    /**
     * @dev Atomically decreases the allowance granted to `_spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `_spender` cannot be the zero address.
     * - `_spender` must have allowance for the caller of at least
     * `_subtractedValue`.
     * @param _spender The address that will be given the allownace decrease
     * @param _subtractedValue How much the allowance should be decreased by
     * @return whether the operation succeeded
     */
    function _decreaseAllowance(address _spender, uint256 _subtractedValue)
        internal
        returns (bool)
    {
        (bool result, ) = TokenProxy._delegatecall(
            abi.encodeWithSelector(
                IERC20Proxy.decreaseAllowance.selector,
                _spender,
                _subtractedValue
            )
        );
        return result;
    }

    /**
     * @dev Atomically increases the allowance granted to `_spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `_spender` cannot be the zero address.
     * @param _spender The address that will be given the allownace increase
     * @param _addedValue How much the allowance should be increased by
     * @return whether the operation succeeded
     */
    function _increaseAllowance(address _spender, uint256 _addedValue)
        internal
        returns (bool)
    {
        (bool result, ) = TokenProxy._delegatecall(
            abi.encodeWithSelector(
                IERC20Proxy.increaseAllowance.selector,
                _spender,
                _addedValue
            )
        );
        return result;
    }

    /**
     * @dev Moves `_amount` tokens from `_sender` to `_recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     * @param _sender The address of the account owner the tokens will come from
     * @param _recipient The recipient of the tokens
     * @param _amount The amount of tokens to send to the recipient from the sender's account
     * @return whether the operation succeeded
     */
    function _transferFrom(
        address _sender,
        address _recipient,
        uint256 _amount
    ) internal returns (bool) {
        (bool result, ) = TokenProxy._delegatecall(
            abi.encodeWithSelector(
                IERC20.transferFrom.selector,
                _sender,
                _recipient,
                _amount
            )
        );
        return result;
    }

    /**
     * @dev Sets `_amount` as the allowance of `_spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     * @param _spender The address to approve spending the caller's tokens for
     * @param _amount The total amount of tokens the spender is approved to spend on behalf of the caller
     * @return whether the operation succeeded
     */
    function _approve(address _spender, uint256 _amount)
        internal
        returns (bool)
    {
        (bool result, ) = TokenProxy._delegatecall(
            abi.encodeWithSelector(IERC20.approve.selector, _spender, _amount)
        );
        return result;
    }

    /**
     * @dev Moves `_amount` tokens from the caller's account to `_recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     * @param _recipient The recipient of the token transfer from the caller
     * @param _amount The amount from the caller's account to transfer
     * @return whether the operation succeeded
     */
    function _transfer(address _recipient, uint256 _amount)
        internal
        returns (bool)
    {
        (bool result, ) = TokenProxy._delegatecall(
            abi.encodeWithSelector(
                IERC20.transfer.selector,
                _recipient,
                _amount
            )
        );
        return result;
    }

    /**
     * @dev The domain name of this ERC20 Token Proxy will be the ERC20 Token name().
     * This value does not change.
     * @return The domain name of this ERC20 Token Proxy
     */
    function _domainName()
        internal
        view
        virtual
        override
        returns (bytes memory)
    {
        return bytes(name());
    }

    /**
     * @notice This Token Proxy supports the ERC20 standard
     * @dev This value does not change, will always return TokenStandard.ERC20
     * @return The name of this Token standard
     */
    function tokenStandard() external pure override returns (TokenStandard) {
        return TokenStandard.ERC20;
    }
}
