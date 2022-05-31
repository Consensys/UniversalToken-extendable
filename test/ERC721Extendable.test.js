const { assert } = require("chai");
const { expectRevert } = require("@openzeppelin/test-helpers");
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants");

const ERC721Extendable = artifacts.require("ERC721");
const ERC721Logic = artifacts.require("ERC721Logic");
const ERC721LogicMock = artifacts.require("ERC721LogicMock");

contract(
  "ERC721",
  function ([deployer, sender, holder, recipient, recipient2, notary]) {
    describe("ERC721 with no extensions", function () {
      const maxSupply = 5000;
      const initialSupply = 0;
      let token;
      before(async function () {
        //snapshot = await takeSnapshot();
        //snapshotId = snapshot["result"];
        this.logic = await ERC721Logic.new();
        token = await ERC721Extendable.new(
          "ERC721Extendable",
          "DAU",
          true,
          true,
          maxSupply,
          deployer,
          this.logic.address
        );

        let tokenLogic = await ERC721Logic.at(token.address);

        //combine both objects so we can use all the functions
        token = Object.assign(token, tokenLogic);

        assert.equal(await token.isMinter(deployer), true);
        assert.equal(await token.name(), "ERC721Extendable");
        assert.equal(await token.symbol(), "DAU");
        assert.equal(await token.totalSupply(), initialSupply);
        assert.equal(await token.balanceOf(deployer), initialSupply);
      });

      it("Mint token 1 to holder", async () => {
        assert.equal(await token.totalSupply(), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        const result = await token.mint(holder, 1, { from: deployer });
        assert.equal(result.receipt.status, 1);
        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 1);
        assert.equal(await token.ownerOf(1), holder);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 0);
        assert.equal(await token.balanceOf(recipient2), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1);
      });

      it("Only Holder can Burn token 1", async () => {
        assert.equal(await token.totalSupply(), initialSupply + 1);
        assert.equal(await token.balanceOf(holder), 1);
        await expectRevert.unspecified(token.burn(1, { from: deployer }));
      });

      it("Holder Burns token 1", async () => {
        assert.equal(await token.totalSupply(), initialSupply + 1);
        assert.equal(await token.balanceOf(holder), 1);
        const result = await token.burn(1, { from: holder });
        assert.equal(result.receipt.status, 1);
        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 0);
        assert.equal(await token.balanceOf(recipient2), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply);
      });

      it("Mint token 2 to holder using mintAndSetTokenURI", async () => {
        assert.equal(await token.totalSupply(), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        const result = await token.mintAndSetTokenURI(
          holder,
          2,
          "example.com",
          {
            from: deployer,
          }
        );
        assert.equal(result.receipt.status, 1);
        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 1);
        assert.equal(await token.ownerOf(2), holder);
        assert.equal(await token.tokenURI(2), "example.com");
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 0);
        assert.equal(await token.balanceOf(recipient2), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1);
      });

      it("Minter can change token URI of token 2", async () => {
        assert.equal(await token.ownerOf(2), holder);
        assert.equal(await token.tokenURI(2), "example.com");
        const result = await token.setTokenURI(2, "example.com/test.json", {
          from: deployer,
        });
        assert.equal(result.receipt.status, 1);
        assert.equal(await token.ownerOf(2), holder);
        assert.equal(await token.tokenURI(2), "example.com/test.json");
      });

      it("Only minters can change tokenURI", async () => {
        assert.equal(await token.ownerOf(2), holder);
        assert.equal(await token.tokenURI(2), "example.com/test.json");
        await expectRevert.unspecified(
          token.setTokenURI(2, "example.com/test2.json", { from: sender })
        );
      });

      it("Transfer token 1 from holder to recipient", async () => {
        assert.equal(await token.totalSupply(), initialSupply + 1);
        assert.equal(await token.balanceOf(holder), 1);
        const result = await token.safeTransferFrom(holder, recipient, 2, {
          from: holder,
        });
        assert.equal(result.receipt.status, 1);
        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 1);
        assert.equal(await token.ownerOf(2), recipient);
        assert.equal(await token.balanceOf(recipient2), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1);
      });

      it("only minters can mint", async () => {
        assert.equal(await token.isMinter(recipient), false);
        await expectRevert.unspecified(
          token.mint(recipient2, 200, { from: recipient })
        );
      });

      it("recipient cant transfer token 1 to recipient2 since they dont own it", async () => {
        await expectRevert.unspecified(
          token.safeTransferFrom(recipient, recipient2, 1, { from: recipient })
        );
      });

      it("notary can safeTransferFrom(recipient, recipient2, 2) when recipient uses approve", async () => {
        await expectRevert.unspecified(
          token.safeTransferFrom(recipient, recipient2, 2, { from: notary })
        );

        assert.equal(await token.totalSupply(), initialSupply + 1);
        assert.equal(await token.balanceOf(recipient), 1);
        assert.equal(await token.getApproved(2), ZERO_ADDRESS);

        const result = await token.approve(notary, 2, { from: recipient });
        assert.equal(await token.getApproved(2), notary);
        const result2 = await token.safeTransferFrom(recipient, recipient2, 2, {
          from: notary,
        });

        assert.equal(result.receipt.status, 1);
        assert.equal(result2.receipt.status, 1);

        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient2), 1);
        assert.equal(await token.getApproved(2), ZERO_ADDRESS);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1);
      });

      it("notary can safeTransferFrom(recipient2, recipient, 2) when recipient2 uses setApprovalForAll", async () => {
        await expectRevert.unspecified(
          token.safeTransferFrom(recipient2, recipient, 2, { from: notary })
        );

        assert.equal(await token.totalSupply(), initialSupply + 1);
        assert.equal(await token.balanceOf(recipient2), 1);
        assert.equal(await token.isApprovedForAll(recipient2, notary), false);

        const result = await token.setApprovalForAll(notary, true, {
          from: recipient2,
        });
        assert.equal(await token.isApprovedForAll(recipient2, notary), true);
        const result2 = await token.safeTransferFrom(recipient2, recipient, 2, {
          from: notary,
        });

        assert.equal(result.receipt.status, 1);
        assert.equal(result2.receipt.status, 1);

        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 1);
        assert.equal(await token.isApprovedForAll(recipient2, notary), true);
        assert.equal(await token.isApprovedForAll(recipient, notary), false);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1);
      });

      it("upgradeTo reverts if non-owner executes it", async () => {
        let newLogic = await ERC721LogicMock.new();

        await expectRevert.unspecified(
          token.upgradeTo(newLogic.address, [], { from: notary })
        );
      });

      it("when the owner upgrades, it's successful", async () => {
        let newLogic = await ERC721LogicMock.new();

        await token.upgradeTo(newLogic.address, [], { from: deployer });

        //Bind the token address to the mock ABI
        //so we can invoke new functions
        const upgradedTokenApi = await ERC721LogicMock.at(token.address);

        //Only mock contract has the isMock function
        assert.equal(await upgradedTokenApi.isMock(), "This is a mock!");
      });
    });
  }
);
