const { deployContractExec } = require("../../utils/deployer.js");

module.exports = deployContractExec(artifacts, "./PauseExtension.sol");
