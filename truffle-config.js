require("dotenv").config();
require("@babel/register");
require("@babel/polyfill");

const HDWalletProvider = require("@truffle/hdwallet-provider");

const providerWithMnemonic = (mnemonic, rpcEndpoint) => () =>
  new HDWalletProvider(mnemonic, rpcEndpoint);

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      gas: 6000000,
      network_id: "*", // eslint-disable-line camelcase
    },
    coverage: {
      host: "localhost",
      network_id: "*", // eslint-disable-line camelcase
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
      // disableConfirmationListener: true,
    },
    env: {
      provider: providerWithMnemonic(
        process.env.MNEMONIC,
        process.env.RPC_ENDPOINT
      ),
      network_id: parseInt(process.env.NETWORK_ID) || "*", // eslint-disable-line camelcase
    },
  },
  plugins: [
    "solidity-coverage",
    "truffle-contract-size",
    "truffle-plugin-verify",
  ],
  compilers: {
    solc: {
      version: "0.8.7",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200, // Default: 200
        },
      },
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
  },
};
