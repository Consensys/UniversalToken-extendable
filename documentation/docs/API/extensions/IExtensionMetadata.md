## `IExtensionMetadata`



An interface that extensions must implement that provides additional
metadata about the extension.


### `externalFunctions() → bytes4[]` (external)

An array of function signatures this extension adds when
registered when a TokenProxy


This function is used by the TokenProxy to determine what
function selectors to add to the TokenProxy

### `requiredRoles() → bytes32[]` (external)

An array of role IDs that this extension requires from the Token
in order to function properly


This function is used by the TokenProxy to determine what
roles to grant to the extension after registration and what roles to remove
when removing the extension

### `isTokenStandardSupported(enum TokenStandard standard) → bool` (external)

Whether a given Token standard is supported by this Extension




### `extensionDeployer() → address` (external)

The address that deployed this extension.



### `packageHash() → bytes32` (external)

The hash of the package string this extension was deployed with



### `version() → uint256` (external)

The version of this extension, represented as a number



### `interfaceLabel() → string` (external)

The ERC1820 interface label the extension will be registered as in the ERC1820 registry






