## `TokenExtension`

This shouldn't be used directly, it should be extended by child contracts


This contract setups the base of every Token Extension contract. It
defines a set data structure for holding important information about
the current Extension registration instance. This includes the extension
supported token standards, function signatures, supported interfaces,
deployer address and extension version.

The TokenExtension also defines three functions that allow extensions to register
callbacks to specific events: _listenForTokenTransfers, _listenForTokenBeforeTransfers,
_listenForTokenApprovals

The ExtensionBase also provides several function modifiers to restrict function
invokation

### `onlyOwner()`



A function modifier to only allow the token owner to execute this function

### `onlyTokenOrOwner()`



A function modifier to only allow the token owner or the address
that registered the extension to execute this function


### `constructor()` (internal)



Invoke TokenExtension constructor and set the deployer as well as register
the packageHash

### `_setVersion(uint256 __version)` (internal)



Sets the package version. Can only be called within
the constructor


### `_setPackageName(string package)` (internal)



Sets the package name. Can only be called within
the constructor


### `_supportsTokenStandard(enum TokenStandard tokenStandard)` (internal)



Sets token standard as supported. Can only be called
within the constructor. Valid token standards referenced in
the TokenStandards enum


### `_setInterfaceLabel(string interfaceLabel_)` (internal)



Sets the interface label of the extension. Can only be
called within the constructor and should be called for
every extension.


### `_supportsAllTokenStandards()` (internal)



Sets all valid token standard as supported. Can only
be called within the constructor.

### `extensionDeployer() → address` (external)

Gets the extension deployer address




### `packageHash() → bytes32` (external)

Gets the package hash (generated using the package name and
deployer address)




### `version() → uint256` (external)

Gets the package version




### `isTokenStandardSupported(enum TokenStandard standard) → bool` (external)

Checks if token standard is supported by the extension




### `_requireRole(bytes32 roleId)` (internal)



Specify a token role Id that this extension requires. For example
if an extension needs to mint tokens then it should require TOKEN_MINTER_ROLE.
Can only be called within the constructor.


### `_supportInterface(bytes4 interfaceId)` (internal)



Specify a specific interface label that this extension supports.
Can only be called within the constructor.


### `_registerFunctionName(string selector)` (internal)



Same as `_registerFunction(bytes4)`, however
lets you specify a function by its function signature.
Can only be called within the constructor.


### `_registerFunction(bytes4 selector)` (internal)



Register a function selector to be added to the token.
If this function is invoked on the token, then this extension
instance will be invoked. Can only be called within the constructor.


### `externalFunctions() → bytes4[]` (external)

An array of function signatures registered by the extension


This function is used by the TokenProxy to determine what
function selectors to add to the TokenProxy


### `requiredRoles() → bytes32[]` (external)

Gets the list of required roles required to call the extension




### `_isInsideConstructorCall() → bool` (internal)



Checks if execution context is within the contract constructor


### `interfaceLabel() → string` (external)

The ERC1820 interface label the extension will be registered as
in the ERC1820 registry



### `_isTokenOwner(address addr) → bool` (internal)



Checks if address is the token owner


### `_erc20Token() → contract IERC20Extendable` (internal)



Explicit method for erc20 tokens. I returns an erc20 proxy contract interface


### `_tokenOwner() → address` (internal)



Get the current owner address of the registered token


### `_buildTransfer(address from, address to, uint256 amountOrTokenId) → struct TransferData` (internal)



Creates a TransferData structure, to be used as an argument for tokenTransfer
function. Also it is relevant to point out that TransferData supports
all token standards available in this enum TokenStandard


### `_tokenTransfer(struct TransferData tdata) → bool` (internal)



Perform a transfer given a TransferData struct. Only addresses with the
token controllers role should be able to invoke this function.


### `_listenForTokenTransfers(function (struct TransferData) external returns (bool) callback)` (internal)



Listen for token transfers and invoke the provided callback function.
When the callback is invoked, the transfer has already occured.
It is important that the callback has the onlyToken modifier in order to ensure that
only the token can execute the callback function.


### `_listenForTokenBeforeTransfers(function (struct TransferData) external returns (bool) callback)` (internal)



Listen for token approvals and invoke the provided callback function.
When the callback is invoked, the approval has already occured.
It is important that the callback has the onlyToken modifier in order to ensure that
only the token can execute the callback function.


### `_listenForTokenApprovals(function (struct TransferData) external returns (bool) callback)` (internal)



Listen for token transfers and invoke the provided callback function.
The callback is invoked right before the transfer occurs.
It is important that the callback has the onlyToken modifier in order to ensure that
only the token can execute the callback function





