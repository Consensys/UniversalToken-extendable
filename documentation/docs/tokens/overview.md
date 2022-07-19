# Overview

The token smart contracts consist of two primary contracts. The `TokenProxy` and the `TokenLogic`. The token proxy is responsible for

1. Managing token roles
2. Managing the current token logic implementation contract

The primary smart contract used by all implementations in the repo is the [ExtendableTokenProxy](./extendable-token-proxy.md) which adds supports
for extensions and is responsible for

1. Managing token extensions
2. Routing calls to either the token logic contract or extensions (based on function selector)

# TokenProxy Functionality

This section discusses the different functions of the `TokenProxy` that is used by every token standard contract deployed (`ERC20`, `ERC721`, etc.).

This section assumes you have a token deployed on-chain and you have access to the token contract via a Truffle contract variable named `token` inside a script. However, these functions can be used by any client such as with Etherscan or with Hardhat. 

## Interface

The `IToken` interface is the interface that all token contracts must adhere to. 

The `IToken` interface allows for token transfer interoperability as well as basic introspection about the token standard that it supports

## tokenTransfer(TransferData) onlyControllers

This function enables the transfer of tokens given an interoperable struct `TransferData` representing data about the transfer request. The structure used has the following fields:

 * token
    - Token address that is executing this extension.
 * payload
    - The full payload of the initial transaction.
 * partition
    - Name of the partition (left empty for ERC20 transfer).
 * operator
    - Address which triggered the balance decrease (through transfer or redemption).
 * from
    - Token holder.
 * to
    - Token recipient for a transfer and 0x for a redemption.
 * value
    - Number of tokens the token holder balance is decreased by.
 * data
    - Extra information (if any).
 * operatorData
    - Extra information, attached by the operator (if any).

This function can only be used by [token controllers](./token-roles.md#controller), and is mainly used to perform [controlled transfers](../extensions/controlled-transfers.md) inside of extensions.

## tokenStandard() pure returns (TokenStandard)

    const supportedTokenStandard = await token.tokenStandard();

A pure function that returns the `TokenStandard` this token supports.

This function can be used to determine what kinds of functions the token may support.

# [Token Roles](./token-roles.md)

Token Roles give special permissions to given addresses to invoke specific functions. For example, the `Minter` role can invoke a token mint.

These class of functions show you how to manage these roles.

## manager() view returns (address)

    const managerAddress = await token.manager();

This function returns the current token manager. The token manager can register, enable, disable, and remove extensions. The [token manager](./token-roles.md#manager) is also able to act as a Role admin for the token, meaning they can add/remove arbitrary roles to/from addresses.

## changeManager(address) onlyManager

    const newManager = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.changeManager(newManager);

This function allows the current token manager to transfer their role to another `address`

## isController(address) view returns (bool)

    const isController = await token.isController("0x78F7911996e6803f26e180d21d78949f0fa386EA");

This function returns true if the given `address` is a [token controller](./token-roles.md#controller).

## isMinter(address) view returns (bool)

    const isMinter = await token.isMinter("0x78F7911996e6803f26e180d21d78949f0fa386EA");

This function returns true if the given `address` is a [token minter](./token-roles.md#minter)

## addController(address) onlyController

    const newController = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.addController(newController);

This function allows any token controller to add another token controller `address`

## removeController(address) onlyController

    const controller = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.removeController(controller);

This function allows any token controller to remove another token controller `address`

## addMinter(address) onlyMinter

    const newMinter = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.addMinter(newMinter);

This function allows any token minter to add another token minter `address`

## removeMinter(address) onlyMinter

    const minter = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.removeMinter(minter);

This function allows any token minter to remove another token minter `address`

## owner() view returns (address)

    const currentOwner = await token.owner();

View the current token owner.

## renounceOwnership() onlyOwner

    await token.renounceOwnership();

This function removes the current owner from the token, leaving the contract as owner-less. 

!!! warning
    If the current token owner address is the same as the current token manager, this will also renounce the manager role as well. Leaving the contract without a token manager

!!! warning
    This action cannot be undone

## transferOwnership(address) onlyOwner

    const newOwner = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.transferOwnership(newOwner);

This function allows the current owner to transfer ownership to another address.

!!! note
    If the current token owner is the same address as the current token manager, then the manager role will also be transferred to the new owner `address`

## addRole(address,bytes32) onlyManager

    // RoleID defined in TokenRolesConstants.sol
    const minterRoleId = keccak256("token.proxy.core.mint.role");
    const newMinter = "0x78F7911996e6803f26e180d21d78949f0fa386EA";

    await token.addRole(newMinter, minterRoleId);

This function allows the current token manager to add any `roleId` to any `caller` address.

## removeRole(address,bytes32) onlyManager

    // RoleID defined in TokenRolesConstants.sol
    const minterRoleId = keccak256("token.proxy.core.mint.role");
    const minter = "0x78F7911996e6803f26e180d21d78949f0fa386EA";

    await token.removeRole(minter, minterRoleId);

This function allows the current token manager to remove any `roleId` from any `caller` address.

# [Extensions](../extensions/getting-started.md)

These functions allow you to view the current state of extensions on the token as well as manage extensions.

All extension management related functions can only be invoked by the current [token manager](./token-roles.md#manager)

## allExtensionsRegistered() view returns (address[])

    const extensionAddressList = await token.allExtensionsRegistered();

Return a list of all registered extensions by their deployed address. 

## allExtensionProxies() view returns (address[])

    const extensionProxyAddressList = await token.allExtensionProxies();

Return a list of all registered extensions by their deployed proxy address.

## proxyAddressForExtension(address) view returns (address)

    const extensionAddress = ""
    const proxyAddress = await token.proxyAddressForExtension(extensionAddress);

Given the `address` of an extension deployed on-chain, return the `address` of the registered deployed proxy contract that this token is using. 

If the token does not have the given extension `address` registered, then the zero address is returned

## registerExtension(address) onlyManager

    const extensionAddress = ""
    await token.registerExtension(extensionAddress);

Register the extension at `address` on the token. This will deploy a new `ExtensionProxy` pointing to the provided `extensionAddress`, grant required roles to the `ExtensionProxy`, register any extension functions and then invoke `initialize` in the extension.

Only the current token manager can invoke this function.

## removeExtension(address) onlyManager

    const extensionAddress = ""
    await token.removeExtension(extensionAddress);
    
Remove the extension at `address`, this will 

* Delete metadata about the `ExtensionProxy`
* Revoke any required roles the `ExtensionProxy` was granted
* Delete all token event listeners the `ExtensionProxy` used
* Remove any registered extension functions

The only thing this doesn't do is delete the `ExtensionProxy`. The `ExtensionProxy` will remain on-chain as an inactive smart contract proxy

!!! note
    This is to avoid the usage of `selfdestruct` and its side-effects

Only the current token manager can invoke this function.

## disableExtension(address) onlyManager

    const extensionAddress = ""
    await token.disableExtension(extensionAddress);

This function disables the registered `ExtensionProxy` at the given address. This does not delete the registration metadata or clear any event listeners. 

Any event listeners of a disabled extension are skipped.

Any registered extension functions are disabled and ignored when doing extension function lookup.

!!! note
    The function signature is still reserved for extension even if its disabled, it is just ignored during execution. This means new extension registrations cannot conflict with any disabled extension. 

## enableExtension(address) onlyManager

    const extensionAddress = ""
    await token.enableExtension(extensionAddress);

This function enables the registered (but disabled) `ExtensionProxy` at the given address. This is the inverse of [disableExtension](#disableextensionaddress-onlymanager). Enabled extensions are the same as newly registered extensions.
