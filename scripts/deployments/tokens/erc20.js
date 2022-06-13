const erc20TokenConfig = require("../configs/erc20TokenConfig.json");
const { execFromPromise, deployContract } = require("../../utils/deployer.js");
const Web3 = require("web3");

module.exports = execFromPromise(
  deployContract(artifacts, "./ERC20Logic.sol").then(async function (logic) {
    const logicAddress = logic.address;
    // Import ERC20
    const ERC20 = artifacts.require("./ERC20.sol");

    // Deploy ERC20
    const token = await ERC20.new(
      erc20TokenConfig.tokenName,
      erc20TokenConfig.tokenSymbol,
      erc20TokenConfig.allowMint,
      erc20TokenConfig.allowBurn,
      erc20TokenConfig.owner,
      erc20TokenConfig.initialSupply,
      erc20TokenConfig.maxSupply,
      logicAddress
    );

    console.log("\n   > New ERC20 token deployed at address: ", token.address);

    if (erc20TokenConfig.extensions && erc20TokenConfig.extensions.length > 0) {
      for (let i = 0; i < erc20TokenConfig.extensions.length; i++) {
        let extension = erc20TokenConfig.extensions[i];

        if (!web3.utils.isAddress(extension)) {
          const ExtensionFactory = artifacts.require(extension);

          const deployedExtension = await ExtensionFactory.new();

          console.log(
            "\n   > Extension " +
              extension +
              " deployed at address " +
              extension.address
          );

          extension = deployedExtension.address;
        }

        await token.registerExtension(extension, {
          from: erc20TokenConfig.owner,
        });

        console.log(
          "\n   > ERC20 token registered extension at address " + extension
        );
      }
    }
  })
);
