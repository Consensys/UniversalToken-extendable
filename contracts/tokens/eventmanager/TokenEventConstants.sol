// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

abstract contract TokenEventConstants {
    /**
     * @dev The event hash for a token transfer event to be used by the ExtendableEventManager
     * and any extensions wanting to listen to the event
     */
    bytes32 internal constant TOKEN_TRANSFER_EVENT =
        keccak256("token.events.transfer");

    /**
     * @dev The event hash for a token transfer event to be used by the ExtendableEventManager
     * and any extensions wanting to listen to the event
     */
    bytes32 internal constant TOKEN_BEFORE_TRANSFER_EVENT =
        keccak256("consensys.contracts.token.events.before.transfer");

    /**
     * @dev The event hash for a token approval event to be used by the ExtendableEventManager
     * and any extensions wanting to listen to the event
     */
    bytes32 internal constant TOKEN_APPROVE_EVENT =
        keccak256("token.events.approve");
}
