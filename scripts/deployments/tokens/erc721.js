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

    console.log("\n   > New ERC721 token deployed at address: ", token.address);

    if (
      erc721TokenConfig.extensions &&
      erc721TokenConfig.extensions.length > 0
    ) {
      for (let i = 0; i < erc721TokenConfig.extensions.length; i++) {
        let extension = erc721TokenConfig.extensions[i];

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
          from: erc721TokenConfig.owner,
        });

        console.log(
          "\n   > ERC721 token registered extension at address " + extension
        );
      }
    }
  })
);
