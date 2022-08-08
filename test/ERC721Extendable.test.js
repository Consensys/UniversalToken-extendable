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
        assert.equal(await token.mintingAllowed(), true);
        assert.equal(await token.burningAllowed(), true);
        assert.equal(await token.tokenStandard(), 1);
        assert.equal(await token.maxSupply(), maxSupply);
      });

      it("Mint token 1 to holder", async () => {
        assert.equal(await token.totalSupply(), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        const result = await token.mint(holder, 1, { from: deployer });
        assert.equal(result.receipt.status, 1);
        // Test the Transfer event (minting from the zero address)
        let eventName = result.logs[0].event;
        let eventRes = result.logs[0].args;
        assert.equal(eventName, "Transfer");
        assert.equal(eventRes[0], "0x0000000000000000000000000000000000000000");
        assert.equal(eventRes[1], holder);
        assert.equal(eventRes[2], 1);

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
        // Test the Approval event
        let eventName = result.logs[0].event;
        let eventRes = result.logs[0].args;
        assert.equal(eventName, "Approval");
        assert.equal(eventRes[0], holder);
        assert.equal(eventRes[1], "0x0000000000000000000000000000000000000000");
        assert.equal(eventRes[2], 1);

        // Test the Transfer event (burn to the zero address)
        let eventName1 = result.logs[1].event;
        let eventRes1 = result.logs[1].args;
        assert.equal(eventName1, "Transfer");
        assert.equal(eventRes1[0], holder);
        assert.equal(
          eventRes1[1],
          "0x0000000000000000000000000000000000000000"
        );
        assert.equal(eventRes1[2], 1);

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
        // Test the Transfer event (minting from the zero address)
        let eventName = result.logs[0].event;
        let eventRes = result.logs[0].args;
        assert.equal(eventName, "Transfer");
        assert.equal(eventRes[0], "0x0000000000000000000000000000000000000000");
        assert.equal(eventRes[1], holder);
        assert.equal(eventRes[2], 2);

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

      it("Cant mint token 2 as already minted", async () => {
        let newLogic = await ERC721LogicMock.new();

        await expectRevert.unspecified(
          token.mint(holder, 2, {
            from: deployer,
          })
        );
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

      it("Only owner can change contract URI", async () => {
        await expectRevert.unspecified(
          token.setContractURI("example.com/contractURI.json", { from: sender })
        );
      });

      it("Change contract URI", async () => {
        assert.equal(await token.contractURI(), "");
        const result = await token.setContractURI(
          "example.com/contractURI.json",
          { from: deployer }
        );
        assert.equal(result.receipt.status, 1);
        assert.equal(await token.contractURI(), "example.com/contractURI.json");
      });

      it("Transfer token 2 from holder to recipient", async () => {
        assert.equal(await token.totalSupply(), initialSupply + 1);
        assert.equal(await token.balanceOf(holder), 1);
        const result = await token.safeTransferFrom(holder, recipient, 2, {
          from: holder,
        });
        assert.equal(result.receipt.status, 1);
        // Test the Approval event
        let eventName = result.logs[0].event;
        let eventRes = result.logs[0].args;
        assert.equal(eventName, "Approval");
        assert.equal(eventRes[0], holder);
        assert.equal(eventRes[1], "0x0000000000000000000000000000000000000000");
        assert.equal(eventRes[2], 2);

        // Test the Transfer event
        let eventName1 = result.logs[1].event;
        let eventRes1 = result.logs[1].args;
        assert.equal(eventName1, "Transfer");
        assert.equal(eventRes1[0], holder);
        assert.equal(eventRes1[1], recipient);
        assert.equal(eventRes1[2], 2);

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

      it("Mint token 3 to holder and transfer to recipient", async () => {
        assert.equal(await token.totalSupply(), initialSupply + 1);
        assert.equal(await token.balanceOf(holder), 0);
        const result = await token.mint(holder, 3, { from: deployer });
        assert.equal(result.receipt.status, 1);
        // Test the Transfer event (minting from the zero address)
        let eventName = result.logs[0].event;
        let eventRes = result.logs[0].args;
        assert.equal(eventName, "Transfer");
        assert.equal(eventRes[0], "0x0000000000000000000000000000000000000000");
        assert.equal(eventRes[1], holder);
        assert.equal(eventRes[2], 3);

        // transfer token from holder to recipient
        const result2 = await token.transferFrom(holder, recipient, 3, {
          from: holder,
        });
        assert.equal(result2.receipt.status, 1);
        // Test the Approval event
        let eventName1 = result2.logs[0].event;
        let eventRes1 = result2.logs[0].args;
        assert.equal(eventName1, "Approval");
        assert.equal(eventRes1[0], holder);
        assert.equal(
          eventRes1[1],
          "0x0000000000000000000000000000000000000000"
        );
        assert.equal(eventRes1[2], 3);

        // Test the Transfer event
        let eventName2 = result2.logs[1].event;
        let eventRes2 = result2.logs[1].args;
        assert.equal(eventName2, "Transfer");
        assert.equal(eventRes2[0], holder);
        assert.equal(eventRes2[1], recipient);
        assert.equal(eventRes2[2], 3);

        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        assert.equal(await token.ownerOf(3), recipient);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 2);
        assert.equal(await token.balanceOf(recipient2), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 2);
      });

      it("notary can safeTransferFrom(recipient, recipient2, 2) when recipient uses approve", async () => {
        await expectRevert.unspecified(
          token.safeTransferFrom(recipient, recipient2, 2, { from: notary })
        );

        assert.equal(await token.totalSupply(), initialSupply + 2);
        assert.equal(await token.balanceOf(recipient), 2);
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
        assert.equal(await token.totalSupply(), initialSupply + 2);
      });

      it("notary can safeTransferFrom(recipient2, recipient, 2) when recipient2 uses setApprovalForAll", async () => {
        await expectRevert.unspecified(
          token.safeTransferFrom(recipient2, recipient, 2, { from: notary })
        );

        assert.equal(await token.totalSupply(), initialSupply + 2);
        assert.equal(await token.balanceOf(recipient2), 1);
        assert.equal(await token.isApprovedForAll(recipient2, notary), false);

        const result = await token.setApprovalForAll(notary, true, {
          from: recipient2,
        });
        assert.equal(result.receipt.status, 1);
        // Test the ApprovalForAll event
        let eventName = result.logs[0].event;
        let eventRes = result.logs[0].args;
        assert.equal(eventName, "ApprovalForAll");
        assert.equal(eventRes[0], recipient2);
        assert.equal(eventRes[1], notary);
        assert.equal(eventRes[2], true);

        assert.equal(await token.isApprovedForAll(recipient2, notary), true);
        const result2 = await token.safeTransferFrom(recipient2, recipient, 2, {
          from: notary,
        });
        assert.equal(result2.receipt.status, 1);
        // Test the Approval event
        let eventName1 = result2.logs[0].event;
        let eventRes1 = result2.logs[0].args;
        assert.equal(eventName1, "Approval");
        assert.equal(eventRes1[0], recipient2);
        assert.equal(
          eventRes1[1],
          "0x0000000000000000000000000000000000000000"
        );
        assert.equal(eventRes1[2], 2);

        // Test the Transfer event
        let eventName2 = result2.logs[1].event;
        let eventRes2 = result2.logs[1].args;
        assert.equal(eventName2, "Transfer");
        assert.equal(eventRes2[0], recipient2);
        assert.equal(eventRes2[1], recipient);
        assert.equal(eventRes2[2], 2);

        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 2);
        assert.equal(await token.isApprovedForAll(recipient2, notary), true);
        assert.equal(await token.isApprovedForAll(recipient, notary), false);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 2);
      });

      it("upgradeTo reverts if non-owner executes it", async () => {
        let newLogic = await ERC721LogicMock.new();

        await expectRevert.unspecified(
          token.upgradeTo(newLogic.address, [], { from: notary })
        );
      });

      it("when the owner upgrades, it's successful", async () => {
        let newLogic = await ERC721LogicMock.new();

        const res = await token.upgradeTo(newLogic.address, [], {
          from: deployer,
        });

        //Bind the token address to the mock ABI
        //so we can invoke new functions
        const upgradedTokenApi = await ERC721LogicMock.at(token.address);

        // Test the Upgraded event
        let eventName = res.logs[0].event;
        let eventRes = res.logs[0].args;

        assert.equal(eventName, "Upgraded");
        assert.equal(eventRes[0], newLogic.address);

        //Only mock contract has the isMock function
        assert.equal(await upgradedTokenApi.isMock(), "This is a mock!");
      });

      xit("Deploys a new token with holder as the owner", async () => {
        const initialSupply = 0;
        const maxSupply = 5000;
        let tokenLogic;
        let tokenProxy;
        let token;

        tokenLogic = await ERC721Logic.new();
        tokenProxy = await ERC721Extendable.new(
          "ERC721Extendable2",
          "DAU",
          true,
          true,
          maxSupply,
          holder,
          tokenLogic.address
        );

        token = await ERC721Logic.at(tokenProxy.address);

        //combine both objects so we can use all the functions
        token = Object.assign(token, tokenLogic);

        assert.equal(await token.owner(), holder);
        assert.equal(await token.isMinter(holder), true);
        assert.equal(await token.name(), "ERC721Extendable2");
        assert.equal(await token.symbol(), "DAU");
        assert.equal(await token.totalSupply(), initialSupply);
        assert.equal(await token.maxSupply(), maxSupply);
        assert.equal(await token.mintingAllowed(), true);
        assert.equal(await token.burningAllowed(), true);
        assert.equal(await token.balanceOf(holder), initialSupply);
        assert.equal(await token.tokenStandard(), 1);
      });
    });
  }
);
