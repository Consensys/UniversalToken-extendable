!!! note
    I haven't followed the steps so I don't know if it's working.

Use the repo's [Truffle execution scripts](https://github.com/ConsenSys/UniversalToken-extendable/tree/main/scripts/deployments) to deploy tokens, extensions, and the ERC1820 registry. 

## ERC20

To deploy a new ERC20 token, first edit the config file in `scripts/deployments/configs/erc20TokenConfig.json` with your own details. 

Then, run the following command:

```shell
yarn truffle exec scripts/deployments/tokens/erc20.js
```

## ERC721

To deploy a new ERC20 token, first edit the config file in `scripts/deployments/configs/erc721TokenConfig.json` with your own details. 

Then, run the following command:

```shell
yarn truffle exec scripts/deployments/tokens/erc721.js
```

## Extensions

In `scripts/deployments/extensions/`, there are several `truffle exec` scripts for deploying extensions on-chain. 
