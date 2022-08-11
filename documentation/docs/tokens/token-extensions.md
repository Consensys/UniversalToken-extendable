These functions allow you to view the current state of extensions on the token as well as manage extensions.

All extension management related functions can only be invoked by the current [token manager](./token-roles/token-roles.md#manager).

## `allExtensionsRegistered() view returns (address[])`

```js
const extensionAddressList = await token.allExtensionsRegistered();
```

Return a list of all registered extensions by their deployed address. 

## `allExtensionProxies() view returns (address[])`

```js
const extensionProxyAddressList = await token.allExtensionProxies();
```

Return a list of all registered extensions by their deployed proxy address.

## `proxyAddressForExtension(address) view returns (address)`

```js
const extensionAddress = ""
const proxyAddress = await token.proxyAddressForExtension(extensionAddress);
```

Given the `address` of an extension deployed on-chain, return the `address` of the registered deployed proxy contract that this token is using. 

If the token does not have the given extension `address` registered, then the zero address is returned.

## `registerExtension(address) onlyManager`

```js
const extensionAddress = ""
await token.registerExtension(extensionAddress);
```

Register the extension at `address` on the token. This will deploy a new `ExtensionProxy` pointing to the provided `extensionAddress`, grant required roles to the `ExtensionProxy`, register any extension functions and then invoke `initialize` in the extension.

Only the current token manager can invoke this function.

## `removeExtension(address) onlyManager`

```js
const extensionAddress = ""
await token.removeExtension(extensionAddress);
```

Remove the extension at `address`, this will: 

* Delete metadata about the `ExtensionProxy`.
* Revoke any required roles the `ExtensionProxy` was granted.
* Delete all token event listeners the `ExtensionProxy` used.
* Remove any registered extension functions.

The only thing this doesn't do is delete the `ExtensionProxy`. The `ExtensionProxy` will remain on-chain as an inactive smart contract proxy.

!!! note
    This is to avoid the usage of `selfdestruct` and its side-effects.

Only the current token manager can invoke this function.

## `disableExtension(address) onlyManager`

```js
const extensionAddress = ""
await token.disableExtension(extensionAddress);
```

This function disables the registered `ExtensionProxy` at the given address. This does not delete the registration metadata or clear any event listeners. 

Any event listeners of a disabled extension are skipped.

Any registered extension functions are disabled and ignored when doing extension function lookup.

!!! note
    The function signature is still reserved for extension even if its disabled, it is just ignored during execution. This means new extension registrations cannot conflict with any disabled extension. 

## `enableExtension(address) onlyManager`

```js
const extensionAddress = ""
await token.enableExtension(extensionAddress);
```

This function enables the registered (but disabled) `ExtensionProxy` at the given address. This is the inverse of [disableExtension](#disableextensionaddress-onlymanager). Enabled extensions are the same as newly registered extensions.
