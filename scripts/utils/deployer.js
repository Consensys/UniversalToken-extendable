const propagateError = require("./propagateError.js");

const __deployContract = async function(artifacts, contractName) {
    const ContractFactory = artifacts.require(contractName);
    let contract;
    try {
        contract = await ContractFactory.deployed();
    } catch {
        console.log("\n   > No " + contractName + " contract deployed, deploying new one...");
        contract = await ContractFactory.new();
    }

    const contractAddress = contract.address;

    console.log("\n   > Contract address: ", contractAddress);

    return contract;
}

module.exports = {
    execFromPromise: function(promise) {
        return function(callback) {
            propagateError(callback, async () => {
                await promise;
            });
        }
    },
    deployContractExec: function(artifacts, contractName) {
        return function(callback) {
            propagateError(callback, async () => {
                await __deployContract(artifacts, contractName);
            });
        };
    },
    deployContract: __deployContract,
    ifContractAddressDoesntExist: async function(artifacts, contractName, contractAddress) {
        const ContractFactory = artifacts.require(contractName);

        let registry;
        try {
            registry = await ContractFactory.at(contractAddress);
            throw "Already deployed"; // Already deployed
        } catch {
            return true;
        }
    }
}