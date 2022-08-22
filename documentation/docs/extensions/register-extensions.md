When an extension is deployed on-chain, and you have its contract address, register the extension to a deployed token. 

To register an extension, use the `registerExtension(address extension)` function. 

```js
await token.registerExtension(allowExtContract.address);
```

!!! note
    * This function can only be executed by the current token manager address. 
    * To determine the current token manager address, use the `function manager() public view returns (address)` function. For example:
    
        ```js
        const manager = await token.manager()`
        ```