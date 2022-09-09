const { execFromPromise, deployContract } = require("../../utils/deployer.js");

module.exports = execFromPromise(deployContract(artifacts, 'ERC20LogicMock'));