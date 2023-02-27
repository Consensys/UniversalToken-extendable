const { deployContractExec } = require("../../utils/deployer.js");

const rawPath = process.argv[4];
const contractWithExtension = rawPath.endsWith(".sol")
  ? rawPath
  : rawPath + ".sol";
const contractPath = contractWithExtension.startsWith("./")
  ? contractWithExtension
  : "./" + contractWithExtension;

module.exports = deployContractExec(artifacts, contractPath);
