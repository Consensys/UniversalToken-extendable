module.exports = {
  configureYulOptimizer: true,
  testCommand:
    "node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network coverage",
  compileCommand:
    "node --max-old-space-size=4096 ../node_modules/.bin/truffle compile --network coverage",
  skipFiles: [
    "extensions/allowblock/allow/IAllowlistedAdminRole.sol",
    "extensions/allowblock/allow/IAllowlistedRole.sol",
    "extensions/allowblock/block/IBlocklistedAdminRole.sol",
    "extensions/allowblock/block/IBlocklistedRole.sol",
    "tokens/storage/TokenEventManagerStorage.sol",
    "utils/erc1820/ERC1820Registry.sol",
    "utils/mocks/MockAllowExtension.sol",
    "utils/mocks/MockBlockExtension.sol",
    "tokens/logic/ERC20/IERC20Logic.sol",
    "tokens/logic/ERC721/IERC721Logic.sol"
  ],
  copyPackages: ["@openzeppelin/contracts"],
  mocha: {
    enableTimeouts: false,
    before_timeout: 0,
  },
};
