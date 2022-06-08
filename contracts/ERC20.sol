// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import {IERC20Extendable} from "./IERC20Extendable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20ProtectedTokenData, _getProtectedTokenData} from "./tokens/logic/ERC20/IERC20Logic.sol";
import {TransferData, TokenStandard} from "./tokens/IToken.sol";
import {ExtendableTokenProxy} from "./tokens/proxy/ExtendableTokenProxy.sol";
import {ERC20TokenInterface} from "./tokens/registry/ERC20TokenInterface.sol";
import {DomainAware} from "./utils/DomainAware.sol";
import {TokenProxy} from "./tokens/proxy/TokenProxy.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

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
contract ERC20 is ERC20TokenInterface, ExtendableTokenProxy {
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
     * @param _initalSupply Initial token supply to mint to the owner
     * @param _maxSupply The max supply of tokens allowed. Must be greater-than 0
     * @param _logicAddress The logic contract address to use for this ERC20 proxy
     */
    constructor(
        string memory _name,
        string memory _symbol,
        bool _allowMint,
        bool _allowBurn,
        address _owner,
        uint256 _initalSupply,
        uint256 _maxSupply,
        address _logicAddress
    )
        ExtendableTokenProxy(
            abi.encode(
                _name,
                _symbol,
                _allowMint,
                _allowBurn,
                _initalSupply,
                _maxSupply
            ),
            _logicAddress,
            _owner
        )
    {
        bytes4[] memory _protectedFunctions = new bytes4[](17);

        _protectedFunctions[0] = IERC20.totalSupply.selector;
        _protectedFunctions[1] = IERC20.balanceOf.selector;
        _protectedFunctions[2] = IERC20.transfer.selector;
        _protectedFunctions[3] = IERC20.transferFrom.selector;
        _protectedFunctions[4] = IERC20.approve.selector;
        _protectedFunctions[5] = IERC20.allowance.selector;
        _protectedFunctions[6] = IERC20Extendable.mintingAllowed.selector;
        _protectedFunctions[7] = IERC20Extendable.burningAllowed.selector;
        _protectedFunctions[8] = IERC20Extendable.mint.selector;
        _protectedFunctions[9] = IERC20Extendable.burn.selector;
        _protectedFunctions[10] = IERC20Extendable.burnFrom.selector;
        _protectedFunctions[11] = IERC20Extendable.maxSupply.selector;
        _protectedFunctions[12] = IERC20Extendable.increaseAllowance.selector;
        _protectedFunctions[13] = IERC20Extendable.decreaseAllowance.selector;
        _protectedFunctions[14] = IERC20Metadata.name.selector;
        _protectedFunctions[15] = IERC20Metadata.symbol.selector;
        _protectedFunctions[16] = IERC20Metadata.decimals.selector;

        _protectFunctions(_protectedFunctions);

        //Update the doamin seperator now that
        //we've setup everything
        DomainAware._updateDomainSeparator();
    }

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

        if (_td.tokenId > 0) {
            return false; //We cannot do tokenId transfers
        }

        TokenProxy._delegateCurrentCall();
    }

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
        string memory name;
        if (_isInsideConstructorCall()) {
            //_staticDelegateCall doesn't work inside the constructor
            //See if we can grab from the storage slot ERC20Logic uses
            ERC20ProtectedTokenData storage data = _getProtectedTokenData();
            name = data.name;
        } else {
            //Grab the name from the ERC20 logic through static-delegatecall
            (, bytes memory result) = TokenProxy._staticDelegateCall(
                abi.encodeWithSelector(IERC20Metadata.name.selector)
            );

            name = _safeBytesToString(result);
        }

        return abi.encode(name);
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
