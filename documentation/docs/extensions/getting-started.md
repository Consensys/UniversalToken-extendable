# Overview

Extensions live at the address they are deployed to on-chain. All tokens use this address to register the extension.

When a token registers an extension, it deploys a [Extension Proxy](https://github.com/ConsenSys/UniversalToken/blob/develop/contracts/extensions/ExtensionStorage.sol) which is where the extension's storage is kept for the registration. This means that extensions *by default* have no sense of global state; each registration is essentially a new deployment of that extension.

# Extensions Included

Extensions are a key part of the UniversalToken, the repo comes with 5 extensions ready to be used with a deployed token.

* AllowExtension
    - Only allowlisted addresses can transfer/mint/burn tokens
* BlockExtensions
    - Blocklisted addresses cannot transfer/mint/burn tokens
* PauseExtension
    - Pause all transfer/mint/burns or pause transfer/mint/burns for a specific address
* HoldExtension
    - Token holds are an alternative to escrows allowing to lock tokens while keeping them in the wallet of the investor.

# Deploying Extensions

Before you can attach an extension to your token you must first deploy the extension on-chain. If the extension
is already deployed on-chain then you can skip this step. There shouldn't be any constructor arguments when deploying
an extension, as these arguments will not be accessible by the Extension when it's attached to the token


    const AllowExtension = artifacts.require("AllowExtension");
    const allowExtContract = await AllowExtension.new();


# Registering Extensions

Once an extension is deployed on-chain and you have the extension's contract address, you can register the extension to a deployed token. To register an extension, simply use the `function registerExtension(address extension)`. 

    await token.registerExtension(allowExtContract.address);

!!! note
    This function can only be executed by the current token manager address. To determine the current token manager address, you can use the `function manager() public view returns (address)` function. Example: `const manager = await token.manager()`
