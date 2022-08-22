Extensions are smart contracts that give a token contract additional functionality. 

A common use-case is finer control over the conditions of a token transfer; however there are others, such as adding DeFi support built in or price oracles. 

Extensions live at the address they are deployed to on-chain, and can be used by many different token contracts at the same time. 

!!! important
    All tokens use the onchain deployment address to register the extension.

Each token contract extension registration is independent and keeps its own independent storage. Extension contracts are upgradable by default and therefore follow the same storage rules as the [proxy pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies#storage-collisions-between-implementation-versions).

## Included extensions

The repo comes with a bunch of extensions ready for use with a deployed token:

1. `AllowExtension`
    - Only allow-listed addresses can transfer/mint/burn tokens.
1. `BlockExtensions`
    - Block-listed addresses cannot transfer/mint/burn tokens.
1. `PauseExtension`
    - Pause all transfer/mint/burns or pause transfer/mint/burns for a specific address.
1. `HoldExtension`
    - Token holds are an alternative to escrows allowing to lock tokens while keeping them in the wallet of the investor.


