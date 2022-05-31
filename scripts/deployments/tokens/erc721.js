const erc721TokenConfig = require("../configs/erc721TokenConfig.json");
const { execFromPromise, deployContract } = require("../../utils/deployer.js");

module.exports = execFromPromise(
  deployContract(artifacts, "./ERC721Logic.sol").then(async function (logic) {
    const logicAddress = logic.address;
    // Import ERC721
    const ERC721 = artifacts.require("./ERC721.sol");

    // Deploy ERC721
    const token = await ERC721.new(
      erc721TokenConfig.tokenName,
      erc721TokenConfig.tokenSymbol,
      erc721TokenConfig.allowMint,
      erc721TokenConfig.allowBurn,
      erc721TokenConfig.owner,
      erc721TokenConfig.initialSupply,
      erc721TokenConfig.maxSupply,
      logicAddress
    );

    console.log("\n   > New ERC721 token deployed ataddress: ", token.address);
  })
);
