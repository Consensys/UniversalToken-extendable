Extensions live at the address they are deployed to on-chain. 

All tokens use this address to register the extension.

When a token registers an extension, it deploys an [Extension Proxy](https://github.com/ConsenSys/UniversalToken/blob/develop/contracts/extensions/ExtensionStorage.sol) which is where the extension's storage is kept for the registration. This means that extensions *by default* have no sense of global state; each registration is essentially a new deployment of that extension.

## Included extensions

The repo comes with a bunch of extensions ready for use with a deployed token:

1. `AllowExtension`
    - Only allowlisted addresses can transfer/mint/burn tokens
1. `BlockExtensions`
    - Blocklisted addresses cannot transfer/mint/burn tokens
1. `PauseExtension`
    - Pause all transfer/mint/burns or pause transfer/mint/burns for a specific address
1. `HoldExtension`
    - Token holds are an alternative to escrows allowing to lock tokens while keeping them in the wallet of the investor.


