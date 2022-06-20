!!! note
    This needs a more detailed explanation related to the repo.


## Set up .env

Create a `.env` file in the project root. For example:

!!!	warning
	 The example .env file has different variables so we should explain what they are and why they are there. The docs I have here are more or less the Infura instructions.

```bash
MNEMONIC=<MetaMask-Secret-Recovery-Phrase>
RPC_ENDPOINT=<WEB3_PROVIDER_URL>
```



## Configure Truffle

Configure `truffle-config.js`, at the project root, to use `HDWalletProvider` and the relevant network.

```javascript
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { RPC_ENDPOINT, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_URL),
      network_id: 5,
      gas: 5500000
    }
  }
};
```