// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import {IExtension, TransferData} from "../../extensions/IExtension.sol";
import {TokenEventConstants} from "./TokenEventConstants.sol";
import {ITokenEventManager} from "./ITokenEventManager.sol";
import {RegisteredExtensionStorage} from "../storage/RegisteredExtensionStorage.sol";
import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {TokenEventManagerStorage} from "../storage/TokenEventManagerStorage.sol";

/**
 * @title Transfer Hooks for Extensions
 * @notice This should be inherited by a token logic contract
 * @dev ExtendableHooks provides the _triggerTokenTransferEvent and _triggerTokenApproveEvent internal
 * function that can be used to notify extensions when a transfer/approval occurs.
 */
abstract contract TokenEventManager is
    TokenEventManagerStorage,
    RegisteredExtensionStorage,
    ContextUpgradeable,
    TokenEventConstants,
    ITokenEventManager
{
    function _extensionState(address ext)
        internal
        view
        returns (ExtensionState)
    {
        return RegisteredExtensionStorage._addressToExtensionData(ext).state;
    }

    /**
     * @notice Can not be used directly, can only be used by enabled and registered extensions
     * @dev Listen for an event hash and invoke a given callback function. This callback function
     * will be invoked with the TransferData for the event as well as the current caller that trigger
     * the event appended to the end of the calldata. This can usually be accessed using _msgSender()
     */
    function on(
        bytes32 eventId,
        function(TransferData memory) external returns (bool) callback
    ) external override onlyActiveExtension {
        TokenEventManagerStorage._on(eventId, callback);
    }

    function _trigger(bytes32 eventId, TransferData memory data) internal {
        EventManagerData storage emd = TokenEventManagerStorage
            .eventManagerData();

        SavedCallbackFunction[] storage callbacks = emd.listeners[eventId];

        require(!emd.isFiring[eventId], "Recursive trigger not allowed");

        emd.eventFiringStack++;
        emd.isFiring[eventId] = true;

        for (uint256 i = 0; i < callbacks.length; i++) {
            bytes4 listenerFuncSelector = callbacks[i].callbackSelector;
            address listenerAddress = callbacks[i].callbackAddress;

            if (
                _extensionState(listenerAddress) ==
                ExtensionState.EXTENSION_DISABLED
            ) {
                continue; //Skip disabled extensions
            }

            bytes memory cdata = abi.encodePacked(
                abi.encodeWithSelector(listenerFuncSelector, data),
                _msgSender()
            );

            (bool success, bytes memory result) = listenerAddress.call{
                gas: gasleft()
            }(cdata);

            require(success, string(result));
        }

        emd.isFiring[eventId] = false;
        emd.eventFiringStack--;
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * @param data The transfer data to that represents this transfer to send to extensions.
     */
    function _triggerTokenBeforeTransferEvent(TransferData memory data)
        internal
        virtual
    {
        _trigger(TokenEventConstants.TOKEN_BEFORE_TRANSFER_EVENT, data);
    }

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * @param data The transfer data to that represents this transfer to send to extensions.
     */
    function _triggerTokenTransferEvent(TransferData memory data)
        internal
        virtual
    {
        _trigger(TokenEventConstants.TOKEN_TRANSFER_EVENT, data);
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * @param data The transfer data to that represents this transfer to send to extensions.
     */
    function _triggerTokenApprovalEvent(TransferData memory data)
        internal
        virtual
    {
        _trigger(TokenEventConstants.TOKEN_APPROVE_EVENT, data);
    }
}
