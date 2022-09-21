![Codefi](images/CodefiBanner.png)

[![Run tests](https://github.com/ConsenSys/va-platform-extendable-tokens-pkg/actions/workflows/pr.yml/badge.svg)](https://github.com/ConsenSys/va-platform-extendable-tokens-pkg/actions/workflows/pr.yml)

The Universal Token is a smart-contract framework for creating customisable tokens. Tokens created following the framework are composed of a Token contract to which one or multiple Extension contracts can be connected. 

The Universal Token is compatible with Ethereum’s most used token standards including ERC20, ERC721, ERC1155 and ERC1400.  

Dapp developers may use the Universal Token framework to:
- Easily add new features to a token contract
- Reduce the size of a token contract by not deploying and importing unnecessary code
- Reduce development effort by leveraging a library of reusable token contracts and extension contracts

Using the Universal Token API, developers can deploy extensions contracts and plug extensions contract to Token contracts, either at token deployment or in real-time on-chain.

# Documentation

Explore the ➡️ [documentation site](https://legendary-dollop-dc5f4669.pages.github.io/) to learn how to

* Build custom Token Extensions
* Extend token logic contracts to add custom token functionality
* Build support for custom token standards

# Live Demo

Experiment with the Universal Token Extendable using the ➡️ [Live Demo](https://main--chipper-kangaroo-1ad0c0.netlify.app/)

# Contributing

UniversalToken framework is built on open source and we invite you to contribute enhancements. We welcome all contributions, and are currently looking for contributors to help imeplement the following token standards

* [ERC1155](https://eips.ethereum.org/EIPS/eip-1155)
* [ERC1400](https://polymath.network/erc-1400)

Upon review you will be required to complete a Contributor License Agreement (CLA) before we are able to merge. If you have any questions about the contribution process, please feel free to send an email to [email@consensys.net](mailto:email@consensys.net). Please see the [Contributors guide](.github/CONTRIBUTING.md) for more information about the process.

# Quickstart

The repo uses Truffle to manage unit tests, deployment scripts and migrations. 

There are several Truffle exec scripts to get started with the extendable UniversalToken framework. Before you can interact with the scripts, you must install the required dependencies.

```shell
yarn
```

## Building

The easiest way to get started is by first compiling all contracts 

```shell
yarn build
```

## Usage

All scripts are located under `scripts/`, tests are located under `test/` and Truffle migration files are located under `migrations/`.

### Deploying Registry

The extendable UniversalToken framework uses the [ERC1820 Registry](https://eips.ethereum.org/EIPS/eip-1820) for introspection validation. Therefore you must make sure you have the registry deployed on your blockchain before usage, otherwise token deployment will fail.

If you need to deploy the ERC1820 Registry on-chain, you can use the `scripts/deployments/registry.js` file

```shell
yarn truffle exec scripts/deployments/registry.js
```


### Deploying ERC20 Token

To deploy the extendable `ERC20` token contract, you must first configure your token deployment config. The config file can be found under `scripts/deployments/configs/erc20TokenConfig.json`

```json
{
  "tokenName": "ERC20Extendable",
  "tokenSymbol": "DAU",
  "allowMint": true,
  "allowBurn": true,
  "owner": "0x78F7911996e6803f26e180d21d78949f0fa386EA",
  "initialSupply": 100,
  "maxSupply": 5000000000,
  "extensions": [""]
}

```

The config file lets you configure the following settings for deployment:

* tokenName - The name of the token.
* tokenSymbol - The symbol for the token.
* allowMint - Whether the `mint` function(s) should be enabled or disabled.
* allowBurn - Whether the `burn` function(s) should be enabled or disabled.
* owner - The initial owner address for the token. This address is also granted the token manager role. This address is used to register any extensions listed under the `extensions` option.
* initialSupply - The number of tokens to `mint` to the `owner` address.
* maxSupply - The maximum value of `totalSupply` for this token.
* extensions - A list of extensions to register after token deployment. This can be on-chain addresses of extensions, or contract names that can be imported by `artifacts.require`.

When you have the configuration set, you can deploy your token by running

```shell
yarn truffle exec scripts/deployments/tokens/erc20.js
```

### Deploying ERC721 Token

To deploy the extendable `ERC721` token contract, you must first configure your token deployment config. The config file can be found under `scripts/deployments/configs/erc721TokenConfig.json`

```json
{
  "tokenName": "ERC721Extendable",
  "tokenSymbol": "DAU",
  "allowMint": true,
  "allowBurn": true,
  "owner": "0x78F7911996e6803f26e180d21d78949f0fa386EA",
  "maxSupply": 5000000000,
  "extensions": []
}

```

The config file lets you configure the following settings for deployment:

* tokenName - The name of the token.
* tokenSymbol - The symbol for the token.
* allowMint - Whether the `mint` function(s) should be enabled or disabled.
* allowBurn - Whether the `burn` function(s) should be enabled or disabled.
* owner - The initial owner address for the token. This address is also granted the token manager role. This address is used to register any extensions listed under the `extensions` option.
* maxSupply - The maximum value of `totalSupply` for this token.
* extensions - A list of extensions to register after token deployment. This can be on-chain addresses of extensions, or contract names that can be imported by `artifacts.require`.

When you have the configuration set, you can deploy your token by running

```shell
yarn truffle exec scripts/deployments/tokens/erc721.js
```

### Deploying Extensions

All extension deployment scripts are in the `scripts/deployments/extensions` folder. No configuration is required to deploy extensions. 

To deploy the AllowExtension, run the following command:

```shell
yarn truffle exec scripts/deployments/extensions/allowExtension.js
```

To deploy the BlockExtension, run the following command:

```shell
yarn truffle exec scripts/deployments/extensions/blockExtension.js
```

To deploy the CertificateValidatorExtension, run the following command:

```shell
yarn truffle exec scripts/deployments/extensions/certificateValidatorExtension.js
```

To deploy the HoldExtension, run the following command:

```shell
yarn truffle exec scripts/deployments/extensions/holdExtension.js
```

To deploy the PauseExtension, run the following command:

```shell
yarn truffle exec scripts/deployments/extensions/pauseExtension.js
```

