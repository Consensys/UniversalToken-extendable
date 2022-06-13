## `TokenEventManagerStorage`






### `eventManagerData() → struct TokenEventManagerStorage.EventManagerData ds` (internal)





### `_on(bytes32 eventId, function (struct TransferData) external returns (bool) callback)` (internal)





### `_on(bytes32 eventId, address callbackAddress, bytes4 callbackSelector)` (internal)





### `_clearListeners(address extension)` (internal)



Use this function to clear all listeners for a given extension. The extension will have
to invoke _on again to listen for events again.



### `ExtensionListeningCache`


bool listening


uint256 listenIndex


### `SavedCallbackFunction`


address callbackAddress


bytes4 callbackSelector


### `EventManagerData`


uint256 eventFiringStack


mapping(address => bytes32[]) eventListForExtensions


mapping(address => mapping(bytes32 => struct TokenEventManagerStorage.ExtensionListeningCache)) listeningCache


mapping(bytes32 => struct TokenEventManagerStorage.SavedCallbackFunction[]) listeners


mapping(bytes32 => bool) isFiring



