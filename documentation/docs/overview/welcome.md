# Universal Token

The Universal Token is a smart-contract framework for creating customisable tokens. Tokens created following the framework are composed of a Token contract to which one or multiple Extension contracts can be connected. 

The Universal Token is compatible with Ethereum’s most used token standards including ERC20 and ERC721. With potential support for ERC1155 or ERC1400  

Extensions, deployed on-chain, are reusable across token deployments and standards. 

Extensions can do the following:

* Add external (user-facing) functions to your token.
* Store additional data for your token.
* Listen for token events on-chain such as transfers and approvals
    - This enables custom functionality for token transfers and other token releated events

Using the Universal Token API, developers can deploy smart contract extensions. Token contracts can then plug-and-play these extensions, either at token deployment or in real-time on-chain. 

If you want to jump straight into extension building, head over to the [Extensions](/extensions/extensions) page.

# Getting started

## Deploying

The repo comes with a few truffle execute scripts that you can use to deploy tokens, extensions and the ERC1820 registry. To run any of these, simply execute

```shell
yarn truffle exec scripts/...
```

### ERC1820

!!! note
    The UniversalToken library uses the ERC1820 registry throughout the smart contract arcitecture. You **MUST** make sure you have an ERC1820 registry deployed on your network. To be safe, you can run this script, which will deploy the ERC1820 registry at `0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24` or do nothing if the registry already exists in the network

To deploy the ERC1820 registry, run the following command

```shell
yarn truffle exec scripts/deployments/registry.js
```

If the ERC1820 registry is already deployed on-chain, then the script does nothing.

### ERC20

To deploy a new ERC20 token, first edit the config file in `scripts/deployments/configs/erc20TokenConfig.json`. Then, run the following command

```shell
yarn truffle exec scripts/deployments/tokens/erc20.js
```

### ERC721

To deploy a new ERC20 token, first edit the config file in `scripts/deployments/configs/erc721TokenConfig.json`. Then, run the following command

```shell
yarn truffle exec scripts/deployments/tokens/erc721.js
```

### Extensions

There are several `truffle exec` scripts to deploy extensions on-chain. You can find them in `scripts/deployments/extensions/`

## Building

The easiest way to get started is by first compiling all contracts in your clone repo

```shell
yarn build
```

For this example we will deploy an ERC20 token. However, the steps would be the same for ERC721 or any other supported token standard.

The only differences between token standards would be the constructor arguments used in the token deployment

### Deploy Logic contract
Once you have the contracts compiled, you will then need to obtain an ERC20 logic contract address on the network you plan on using. You can do this by

1. Deploying a new ERC20Logic contract
    1. Run the `3_erc20_global_logic` truffle migration file, OR
    2. Manually deploying the `ERC20Logic` contract

            // artifacts is an object provided by truffle
            // it is automatically available in migration files, tests, and exec scripts 
            const ERC20Logic = artifacts.require("./ERC20Logic.sol");
            let logic = await ERC20Logic.deployed();
            if (!logic) {
                console.log("No ERC20Logic contract deployed, deploying new one...");
                logic = await ERC20Logic.new();
            }

            const logicAddress = logic.address;

            console.log("Logic address:", logicAddress);

2. Using one of the already deployed ERC20 logic contract
    1. Rinkeby: `0x9FE61B546b4bBCdf28fAe9588d18aD7233fFa4b9`
    2. Kovan: 
    3. Ropsten: 
    4. Goreli: 

### Setup ERC20 token deployment

Once you have an ERC20 logic contract address, you then must decide on values for the different token constructor arguments. 

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

### Deploy token

Now you have all variables you need to deploy the `ERC20` token. First import the token contract from truffle `artifacts`

    const ERC20 = artifacts.require("./ERC20.sol");

Then, simply execute the `new` function providing all required constructor arguments

    const token = await ERC20.new(
        tokenName,
        tokenSymbol,
        allowMint,
        allowBurn,
        owner,
        initialSupply,
        maxSupply,
        logicAddress
    );

### Full Example

    // Deploy token logic contract, or obtain currently deployed logic contract
    const ERC20Logic = artifacts.require("./ERC20Logic.sol");
    let logic = await ERC20Logic.deployed();
    if (!logic) {
        console.log("No ERC20Logic contract deployed, deploying new one...");
        logic = await ERC20Logic.new();
    }

    const logicAddress = logic.address;

    console.log("Logic address:", logic.address);

    // Setup constructor arguments

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

    // Import ERC20
    const ERC20 = artifacts.require("./ERC20.sol");

    // Deploy ERC20
    const token = await ERC20.new(
        tokenName,
        tokenSymbol,
        allowMint,
        allowBurn,
        owner,
        initialSupply,
        maxSupply,
        logicAddress
    );

    console.log("New ERC20 token deployed ataddress:", token.address);

## Token Standards Supported

Currently both [ERC20](https://github.com/ConsenSys/UniversalToken/blob/develop/contracts/ERC20Extendable.sol) and [ERC721](https://github.com/ConsenSys/UniversalToken/blob/develop/contracts/tokens/ERC721/proxy/ERC721Proxy.sol) have implementations that support extensions. There are plans to add support for [ERC1400](https://github.com/ethereum/eips/issues/1411) and [ERC1155](https://eips.ethereum.org/EIPS/eip-1155). 


    


