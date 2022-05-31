const { deployContractExec } = require("../../utils/deployer.js");

module.exports = deployContractExec(
  artifacts,
  "./CertificateValidatorExtension.sol"
);
