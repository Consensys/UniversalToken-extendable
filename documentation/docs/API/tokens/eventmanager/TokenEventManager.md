## `TokenEventManager`

This should be inherited by a token logic contract


ExtendableHooks provides the _triggerTokenTransferEvent and _triggerTokenApproveEvent internal
function that can be used to notify extensions when a transfer/approval occurs.


### `_extensionState(address ext) → enum RegisteredExtensionStorage.ExtensionState` (internal)





### `on(bytes32 eventId, function (struct TransferData) external returns (bool) callback)` (external)

Can not be used directly, can only be used by enabled and registered extensions


Listen for an event hash and invoke a given callback function. This callback function
will be invoked with the TransferData for the event as well as the current caller that trigger
the event appended to the end of the calldata. This can usually be accessed using _msgSender()

### `_trigger(bytes32 eventId, struct TransferData data)` (internal)





### `_triggerTokenBeforeTransferEvent(struct TransferData data)` (internal)



Hook that is called before any transfer of tokens. This includes
minting and burning.

Calling conditions:

- when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
will be transferred to `to`.
- when `from` is zero, `amount` tokens will be minted for `to`.
- when `to` is zero, `amount` of ``from``'s tokens will be burned.
- `from` and `to` are never both zero.



### `_triggerTokenTransferEvent(struct TransferData data)` (internal)



Hook that is called after any transfer of tokens. This includes
minting and burning.

Calling conditions:

- when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
will be transferred to `to`.
- when `from` is zero, `amount` tokens will be minted for `to`.
- when `to` is zero, `amount` of ``from``'s tokens will be burned.
- `from` and `to` are never both zero.



### `_triggerTokenApprovalEvent(struct TransferData data)` (internal)



Hook that is called before any transfer of tokens. This includes
minting and burning.

Calling conditions:

- when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
will be transferred to `to`.
- when `from` is zero, `amount` tokens will be minted for `to`.
- when `to` is zero, `amount` of ``from``'s tokens will be burned.
- `from` and `to` are never both zero.






