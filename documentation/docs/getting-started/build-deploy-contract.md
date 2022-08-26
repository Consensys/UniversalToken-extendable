## Build

First, compile all contracts in your cloned repo:

```shell
yarn build
```

## Deploy contract

!!! important
    In this example, we will deploy an ERC20 token. However, the steps are the same for ERC721 or any other supported token standard.

!!! note
    The only difference between token standards are the constructor arguments used in the token deployment.

Once you have compiled the contracts, get an ERC20 logic contract address for the network you plan on using. You can do this by:

1. Deploying a new ERC20Logic contract.

    * Run the `3_erc20_global_logic` truffle migration file, OR
    * Manually deploying the `ERC20Logic` contract:

    ```javascript

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
    ```

    Both these options return a deployed logic contract address.


2. Using one of the already deployed ERC20 logic contracts:
    * Rinkeby: `0x9FE61B546b4bBCdf28fAe9588d18aD7233fFa4b9`: https://rinkeby.etherscan.io/address/0x9FE61B546b4bBCdf28fAe9588d18aD7233fFa4b9#code
    * Kovan: tbc
    * Ropsten: tbc
    * Goerli: tbc


### Logic contract

For development flexibility we use a logic contract alongside the regular ERC20 contract.

This is because the UniversalToken-extendable service uses a Proxy -> Logic pattern which means that contract code can be edited and upgraded by swapping out the logic contract after deployment of the token. 

The logic contract and a regular ERC are quite similar, the only difference is that a regular ERC is deployed without a proxy contract and cannot be updated after deployment.

For more information on this pattern, see the [open zeppelin docs on the proxy pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies#upgrading-via-the-proxy-pattern).


## Deploy token

Now you have everything you need to deploy the `ERC20` token. 

First, import the token contract from truffle `artifacts`:

```javascript
const ERC20 = artifacts.require("./ERC20.sol");
```

Then, execute the `new` function providing all required constructor arguments:

```javascript
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
```

### Full example

```javascript
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
```