Token roles give special permissions to given addresses to invoke specific functions. For example, the `Minter` role can invoke a token mint.

These class of functions show you how to manage these roles.

## `manager() view returns (address)`

```js
const managerAddress = await token.manager();
```

This function returns the current token manager. The token manager can register, enable, disable, and remove extensions. The [token manager](./token-roles.md#manager) is also able to act as a Role admin for the token, meaning they can add/remove arbitrary roles to/from addresses.

## `changeManager(address) onlyManager`

```js
const newManager = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
await token.changeManager(newManager);
```

This function allows the current token manager to transfer their role to another `address`.

## `isController(address) view returns (bool)`

```js
    const isController = await token.isController("0x78F7911996e6803f26e180d21d78949f0fa386EA");
```

This function returns true if the given `address` is a [token controller](./token-roles.md#controller).

## `isMinter(address) view returns (bool)`

```js
    const isMinter = await token.isMinter("0x78F7911996e6803f26e180d21d78949f0fa386EA");
```

This function returns true if the given `address` is a [token minter](./token-roles.md#minter).

## `addController(address) onlyController`

```js
    const newController = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.addController(newController);
```

This function allows any token controller to add another token controller `address`.

## `removeController(address) onlyController`

```js
    const controller = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.removeController(controller);
```

This function allows any token controller to remove another token controller `address`.

## `addMinter(address) onlyMinter`

```js
    const newMinter = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.addMinter(newMinter);
```

This function allows any token minter to add another token minter `address`.

## `removeMinter(address) onlyMinter`

```js
    const minter = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.removeMinter(minter);
```

This function allows any token minter to remove another token minter `address`.

## `owner() view returns (address)`

```js
    const currentOwner = await token.owner();
```

View the current token owner.

## `renounceOwnership() onlyOwner`

```js
    await token.renounceOwnership();
```

This function removes the current owner from the token, leaving the contract as owner-less. 

!!! warning
    If the current token owner address is the same as the current token manager, this will also renounce the manager role as well, leaving the contract without a token manager.

!!! warning
    This action cannot be undone

## `transferOwnership(address) onlyOwner`

```js
    const newOwner = "0x78F7911996e6803f26e180d21d78949f0fa386EA";
    await token.transferOwnership(newOwner);
```

This function allows the current owner to transfer ownership to another address.

!!! note
    If the current token owner is the same address as the current token manager, then the manager role will also be transferred to the new owner `address`.

## `addRole(address,bytes32) onlyManager`

```js
    // RoleID defined in TokenRolesConstants.sol
    const minterRoleId = keccak256("token.proxy.core.mint.role");
    const newMinter = "0x78F7911996e6803f26e180d21d78949f0fa386EA";

    await token.addRole(newMinter, minterRoleId);
```

This function allows the current token manager to add any `roleId` to any `caller` address.

## `removeRole(address,bytes32) onlyManager`

```js
    // RoleID defined in TokenRolesConstants.sol
    const minterRoleId = keccak256("token.proxy.core.mint.role");
    const minter = "0x78F7911996e6803f26e180d21d78949f0fa386EA";

    await token.removeRole(minter, minterRoleId);
```

This function allows the current token manager to remove any `roleId` from any `caller` address.