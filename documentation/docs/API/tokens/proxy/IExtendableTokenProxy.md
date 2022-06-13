## `IExtendableTokenProxy`






### `registerExtension(address extension)` (external)



Register the extension at the given global extension address. This will deploy a new
ExtensionProxy contract to act as a proxy. The extension's proxy will
be initalized and all functions the extension has will be registered



### `upgradeExtension(address extension, address newExtension)` (external)



Upgrade a registered extension at the given global extension address. This will perform
an upgrade on the ExtensionProxy contract that was deployed during registration. The new global
extension address must have the same deployer and package hash.


### `removeExtension(address extension)` (external)



Remove the extension at the provided address. This may either be the
global extension address or the deployed extension proxy address.

Removing an extension deletes all data about the deployed extension proxy address
and makes the extension's storage inaccessable forever.



### `disableExtension(address extension)` (external)



Disable the extension at the provided address. This may either be the
global extension address or the deployed extension proxy address.

Disabling the extension keeps the extension + storage live but simply disables
all registered functions and transfer events



### `enableExtension(address extension)` (external)



Enable the extension at the provided address. This may either be the
global extension address or the deployed extension proxy address.

Enabling the extension simply enables all registered functions and transfer events



### `allExtensionsRegistered() → address[]` (external)



Get an array of all deployed extension proxy addresses, regardless of if they are
enabled or disabled

### `allExtensionProxies() → address[]` (external)



Get an array of all deployed extension proxy addresses, regardless of if they are
enabled or disabled

### `proxyAddressForExtension(address extension) → address` (external)



Get the deployed extension proxy address given a global extension address.
This function assumes the given global extension address has been registered using
 _registerExtension.





