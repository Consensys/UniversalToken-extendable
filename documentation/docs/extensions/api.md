# TokenExtension API

This page goes over the different internal functions that can be used when writing your own token extensions (or extending from the `TokenExtension` abstract contract).

# Constants

The `TokenExtension` contract exposes several constants for [token roles](../tokens/token-roles.md) and for [token events](./token-events.md).

* TOKEN_ALLOW_BURN
    - The storage slot where the burn option toggle is stored
* TOKEN_ALLOW_MINT
    - The storage slot where the mint option toggle is stored
* TOKEN_OWNER
    - The storage slot where the token owner address is stored
* TOKEN_MINTER_ROLE
    - The `roleId` for the [token minter](../tokens/token-roles.md#minter) role
* TOKEN_MANAGER_ADDRESS
    - The storage slot where the token manager address is stored
* TOKEN_CONTROLLER_ROLE
    - The `roleId` for the [token controller](../tokens/token-roles.md#controller) role
* TOKEN_TRANSFER_EVENT
    - The `eventId` for the token transfer event
* TOKEN_BEFORE_TRANSFER_EVENT
    - The `eventId` for the before token transfer event
* TOKEN_APPROVE_EVENT
    - The `eventId` for the token approval event

# Extension Metadata Functions

These functions set specific extension metadata used during extension registration and upgrading. These functions can only be invoked inside the extension's constructor

## _setVersion(uint256)

Set the extension's version number. The version number must be higher when upgrading

## _setPackageName(string)

Set the extension's package hash to match the hash of `keccak256(abi.encodePacked(msg.sender, string))`. This hash must match when upgrading to a new extension

## _supportsTokenStandard(TokenStandard)

Set a specific `TokenStandard` that is supported. 

## _setInterfaceLabel(string)

Set the interface label for this extension. The interface label must match when upgrading to a newer version

## _supportsAllTokenStandards()

Set all token standards as supported

## _requireRole(bytes32)

Set a specific `roleId` that this extension requires when being registered by a token.

## _registerFunction(bytes4)

Set a specific function selector that should be registered when being registered by a token.

## _registerFunctionName(string)

A convenience function if the function selector is not available. 
This is the same as doing

    _registerFunction(bytes4(keccak256(abi.encodePacked(string))))

# Extension Metadata

These are all `view` functions that describe the extension

## extensionDeployer() view returns (address)

The `address` that deployed this extension

## packageHash() view returns (bytes32)

The hash of the package that was set by the extension's constructor

## version() view returns (uint256)

The version of this extension that was set by the extension's constructor

## isTokenStandardSupported(TokenStandard) view returns (bool)

Given a `TokenStandard`, return true if this extension supports that token standard, otherwise false.

## externalFunctions() view returns (bytes4[])

A list of function selectors that **must** be attached to the `TokenProxy` when this extension is registered to a `TokenProxy`.

## requiredRoles() view returns (bytes32[])

A list of `roleId`s that **must** be granted by the `TokenProxy` registering this extension.

## interfaceLabel() view returns (string)

The interface label set by the extension in the constructor

# Internal Metadata

These are internal functions that represent 