## `ExtendableTokenProxy`

This should be inherited by the token proxy that wishes to use extensions


An extendable proxy contract to be used by any token standard. The final token proxy
contract should also inherit from a TokenERC1820Provider contract or implement those functions.
This contract does everything the TokenProxy does and adds extensions support to the proxy contract.
This is done by extending from ExtendableProxy and providing external functions that can be used
by the token proxy manager to manage extensions.

This contract overrides the fallback function to forward any registered function selectors
to the extension that registered them.

The domain name must be implemented by the final token proxy.

### `onlyExtensions()`



A function modifier that will only allow registered & enabled extensions to invoke the function


### `constructor(bytes initializeData, address logicAddress, address owner)` (internal)



Invoke TokenProxy constructor and register ourselves as an ExtendableToken
in the ERC1820 registry.


### `allExtensionsRegistered() → address[]` (external)

Return an array of all global extension addresses, regardless of if they are
enabled or disabled. You cannot interact with these addresses. For user interaction
you should use ExtendableTokenProxy.allExtensionProxies




### `allExtensionProxies() → address[]` (external)

Return an array of all deployed extension proxy addresses, regardless of if they are
enabled or disabled. You can use these addresses for direct interaction. Remember you can also
interact with extensions through the TokenProxy.




### `proxyAddressForExtension(address extension) → address` (external)

Return the deployed extension proxy address given a global extension address.
This function reverts if the given global extension has not been registered using
registerExtension




### `registerExtension(address extension)` (external)

Register an extension providing the given global extension address. This will
deploy a new ExtensionProxy contract to act as the extension proxy and register
all function selectors the extension exposes.
This will also invoke the initialize function on the extension proxy.

Registering an extension automatically enables it for use.

Registering an extension automatically grants any roles the extension requires to
the address of the deployed extension proxy.
See: IExtensionMetadata.requiredRoles()





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





### `_fallback()` (internal)



The default fallback function used in TokenProxy. Overriden here to add support
for registered extension functions. Registered extension functions are only invoked
if they are registered and enabled. Otherwise, the TokenProxy's fallback function is used


### `_registerExtension(address extension) → bool` (internal)



Register an extension at the given global extension address. This will
deploy a new ExtensionProxy contract to act as the extension proxy and register
all function selectors the extension exposes.
This will also invoke the initialize function on the extension proxy, to do this
we must know who the current caller is.
Registering an extension automatically enables it for use.



### `_functionToExtensionProxyAddress(bytes4 funcSig) → address` (internal)



Get the deployed extension proxy address that registered the provided
function selector. If no extension registered the given function selector,
then return address(0). If the extension that registered the function selector is disabled,
then the address(0) is returned


### `_functionToExtensionData(bytes4 funcSig) → struct RegisteredExtensionStorage.ExtensionData` (internal)



Get the full ExtensionData of the extension that registered the provided
function selector, even if the extension is currently disabled.
If no extension registered the given function selector, then a blank ExtensionData is returned.


### `_disableExtension(address ext)` (internal)



Disable the extension at the provided address. This may either be the
global extension address or the deployed extension proxy address.

Disabling the extension keeps the extension + storage live but simply disables
all registered functions and transfer events



### `_enableExtension(address ext)` (internal)



Enable the extension at the provided address. This may either be the
global extension address or the deployed extension proxy address.

Enabling the extension simply enables all registered functions and transfer events



### `_isExtensionProxyAddress(address callsite) → bool` (internal)



Check whether a given address is a deployed extension proxy address that
is registered.



### `_allExtensionsRegistered() → address[]` (internal)



Get an array of all global extension addresses that have been registered, regardless of if they are
enabled or disabled

### `_allExtensionProxies() → address[]` (internal)



Get an array of all deployed extension proxy addresses, regardless of if they are
enabled or disabled

### `_proxyAddressForExtension(address extension) → address` (internal)



Get the deployed extension proxy address given a global extension address.
This function assumes the given global extension address has been registered using
 _registerExtension.


### `_saveExtension(contract ExtensionProxy extProxy, address extension)` (internal)





### `_removeExtension(address ext)` (internal)



Remove the extension at the provided address. This may either be the
global extension address or the deployed extension proxy address.

Removing an extension deletes all data about the deployed extension proxy address
and makes the extension's storage inaccessable forever.



### `_executeOnAllExtensions(function (address,struct TransferData) returns (bool) toInvoke, struct TransferData data) → bool` (internal)



Go through each extension, if it's enabled execute the implemented function and pass the extension
If any invokation of the implemented function given an extension returns false, halt and return false
If they all return true (or there are no extensions), then return true


### `_isExtensionFunction(bytes4 funcSig) → bool` (internal)



Determine if a given function selector is registered by an enabled
deployed extension proxy address. If no extension proxy exists or if the
deployed extension proxy address is disabled, then false is returned



### `_invokeExtensionFunction()` (internal)



Forward the current call to the proper deployed extension proxy address. This
function assumes the current function selector is registered by an enabled deployed extension proxy address.

This call returns and exits the current call context.




