## `RegisteredExtensionStorage`





### `onlyActiveExtension()`






### `_extensionStorage() → struct RegisteredExtensionStorage.MappedExtensions ds` (internal)



Get the MappedExtensions data stored inside this contract.


### `_isActiveExtension(address ext) → bool` (internal)



Determine if the given extension address is active (registered & enabled). The provided
extension address can either be the global extension address or the extension proxy address.


### `_addressToExtensionData(address ext) → struct RegisteredExtensionStorage.ExtensionData` (internal)



Obtain data about an extension address in the form of the ExtensionData struct. The
address provided can be either the global extension address or the deployed extension proxy address


### `__forceGlobalExtensionAddress(address extension) → address` (internal)



If the providen address is the deployed extension proxy, then convert it to the
global extension address. Otherwise, return what was given



### `ExtensionData`


enum RegisteredExtensionStorage.ExtensionState state


uint256 index


address extProxy


bytes4[] externalFunctions


### `MappedExtensions`


address[] registeredExtensions


mapping(bytes4 => address) funcToExtension


mapping(address => struct RegisteredExtensionStorage.ExtensionData) extensions


mapping(address => address) proxyCache



### `ExtensionState`











