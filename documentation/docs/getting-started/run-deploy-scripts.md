Use the repo's [Truffle execution scripts](https://github.com/ConsenSys/UniversalToken-extendable/tree/main/scripts/deployments) to auto-deploy tokens, extensions, and the ERC1820 registry. 

## ERC20

To deploy a new ERC20 token, first edit the config file in `scripts/deployments/configs/erc20TokenConfig.json` with your own details. 

For example:

```javascript
 // The name for the token
 const tokenName = "ERC20Extendable";
 // The symbol for the token
 const tokenSymbol = "DAU";
 // Whether to enable the token minting functions
 const allowMint = true;
 // Whether to enable the token burning functions
 const allowBurn = true;
 // Who the inital token owner/manager address should be. This address will also get any inital supply tokens
 const owner = "0x78F7911996e6803f26e180d21d78949f0fa386EA"
 // How many tokens to give to the assigned inital owner/manager address 
 const initialSupply = 100;
 // The max total supply of tokens is 5,000,000,000
 const maxSupply = 5000000000; 
```

Then, run the following command:

```shell
yarn truffle exec scripts/deployments/tokens/erc20.js --network env
```

## ERC721

To deploy a new ERC721 token, first edit the config file in `scripts/deployments/configs/erc721TokenConfig.json` with your own details as above. 

Then, run the following command:

```shell
yarn truffle exec scripts/deployments/tokens/erc721.js --network env
```

## Extensions

In `scripts/deployments/extensions/`, there are several `truffle exec` scripts for deploying extensions on-chain. 
