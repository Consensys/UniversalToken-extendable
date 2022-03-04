// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const accounts = await ethers.provider.listAccounts();

  const deployer = accounts[0];

  const ERC20LogicMock = await hre.ethers.getContractFactory("ERC20LogicMock");
  
  const ERC20Logic = await hre.ethers.getContractFactory("ERC20Logic");
  const logic = await ERC20Logic.deploy();
  await logic.deployed();


  const ERC20Storage = await hre.ethers.getContractFactory("ERC20Storage");
  
  const PauseExtension = await hre.ethers.getContractFactory("PauseExtension");



  console.log("Deploy token test");

  const ERC20Extendable = await hre.ethers.getContractFactory("ERC20Extendable");
  const erc20 = await ERC20Extendable.deploy(
    "TokenName",   //token name
    "DAU",         //token symbol
    true,          //allow minting
    true,          //allow burning
    deployer,      //token owner address
    1000,          //initial supply to give to owner address
    5000,          //max supply
    logic.address  //address of token logic contract
  );
  await erc20.deployed();

  console.log("Deployer is " + deployer);
  console.log("Is deployer minter? " + (await erc20.isMinter(deployer)));

  console.log("Deployed to " + erc20.address);

  await erc20.mint(accounts[1], "1000");

  console.log("ERC20Extendable token contract deployed to:", erc20.address);

  /* console.log("Deploying mock logic");
  const logic2 = await ERC20LogicMock.deploy();
  await logic2.deployed();

  console.log("Testing directly");
  console.log(await logic2.isMock());

  console.log("Performing upgrade on token to use new mock logic");
  await erc20.upgradeTo(logic2.address);
  
  console.log("Attaching to new logic ABI at address: " + logic2.address);
  const test = await ERC20LogicMock.attach(erc20.address);
  
  console.log("Running isMock()");
  const tttt = await test.isMock();

  console.log(tttt); */

  console.log("Deploying PauseableExtension");
  const pauseExtContract = await PauseExtension.deploy();
  await pauseExtContract.deployed();

  console.log("Registering PauseExtension on token");
  await erc20.registerExtension(pauseExtContract.address);

  const pauseToken = await PauseExtension.attach(erc20.address);

  await pauseToken.pause();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
