## `ExtensionProxy`

This contract can be interacted directly in a normal manner if the
caller is
  * An EOA
  * Not the registered token address
  * Not the registered admin

If the caller is the registered token address or registered admin, then
each function call should be preceeded by a call to prepareCall.




### `constructor(address token, address extension, address callsite)` (public)





### `_extension() → contract IExtension` (internal)





### `upgradeTo(address extensionImplementation)` (external)

Perform an upgrade on the proxy and replace the current logic
contract with a new one. You must provide the new address of the
logic contract.


Upgrade the ExtensionProxy logic contract. Can only be executed by the current
admin of the extension address


### `fallback()` (external)





### `initialize()` (external)

This function cannot be invoked directly


This function is invoked when the Extension is registered
with a TokenProxy

### `_delegate(address implementation)` (internal)



Delegates execution to an implementation contract.
This is a low level function that doesn't return to its internal call site.
It will return to the external caller whatever the implementation returns.


### `externalFunctions() → bytes4[]` (external)

An array of function signatures this extension adds when
registered with a TokenProxy


This function is used by the TokenProxy to determine what
function selectors to add to the TokenProxy

### `requiredRoles() → bytes32[]` (external)

An array of role IDs that this extension requires from the Token
in order to function properly


This function is used by the TokenProxy to determine what
roles to grant to the extension after registration and what roles to remove
when removing the extension

### `isTokenStandardSupported(enum TokenStandard standard) → bool` (public)

Whether a given Token standard is supported by this Extension




### `extensionDeployer() → address` (public)

The address that deployed this extension.



### `packageHash() → bytes32` (public)

The hash of the package string this extension was deployed with



### `version() → uint256` (public)

The version of this extension, represented as a number



### `interfaceLabel() → string` (public)

The ERC1820 interface label the extension will be registered as in the ERC1820 registry




### `ExtensionUpgraded(address extension, address newExtension)`







