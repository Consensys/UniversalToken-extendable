const erc20TokenConfig = require("../configs/erc20TokenConfig.json");
const { execFromPromise, deployContract } = require("../../utils/deployer.js");

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

    console.log("\n   > New ERC20 token deployed ataddress: ", token.address);
  })
);
