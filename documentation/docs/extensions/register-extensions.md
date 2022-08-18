# Registering Extensions

Once an extension is deployed on-chain and you have the extension's contract address, you can register the extension to a deployed token. To register an extension, simply use the `function registerExtension(address extension)`. 

    await token.registerExtension(allowExtContract.address);

!!! note
    This function can only be executed by the current token manager address. To determine the current token manager address, you can use the `function manager() public view returns (address)` function. Example: `const manager = await token.manager()`
