const { assert } = require("chai");
const { expectRevert } = require("@openzeppelin/test-helpers");

const ERC20Extendable = artifacts.require("ERC20");
const ERC20Logic = artifacts.require("ERC20Logic");
const ERC20LogicMock = artifacts.require("ERC20LogicMock");

contract(
  "ERC20",
  function ([deployer, sender, holder, recipient, recipient2, notary]) {
    describe("ERC20 with no extensions", function () {
      const initialSupply = 1000;
      const maxSupply = 5000;
      let token;
      before(async function () {
        //snapshot = await takeSnapshot();
        //snapshotId = snapshot["result"];
        this.logic = await ERC20Logic.new();
        token = await ERC20Extendable.new(
          "ERC20Extendable",
          "DAU",
          true,
          true,
          deployer,
          initialSupply,
          maxSupply,
          this.logic.address
        );

        let tokenLogic = await ERC20Logic.at(token.address);

        //combine both objects so we can use all the functions
        token = Object.assign(token, tokenLogic);

        assert.equal(await token.isMinter(deployer), true);
        assert.equal(await token.name(), "ERC20Extendable");
        assert.equal(await token.symbol(), "DAU");
        assert.equal(await token.totalSupply(), initialSupply);
        assert.equal(await token.maxSupply(), maxSupply);
        assert.equal(await token.mintingAllowed(), true);
        assert.equal(await token.burningAllowed(), true);
        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.tokenStandard(), 0);
      });

      it("Mint 1000 tokens to holder", async () => {
        assert.equal(await token.totalSupply(), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        const result = await token.mint(holder, 1000, {
          from: deployer,
        });
        assert.equal(result.receipt.status, 1);
        // Test the Transfer event (minting from the zero address)
        let eventName = result.logs[0].event;
        let eventRes = result.logs[0].args;
        assert.equal(eventName, "Transfer");
        assert.equal(eventRes[0], "0x0000000000000000000000000000000000000000");
        assert.equal(eventRes[1], holder);
        assert.equal(eventRes[2], 1000);

        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 1000);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 0);
        assert.equal(await token.balanceOf(recipient2), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1000);
      });

      it("Holder Burns 100 tokens", async () => {
        assert.equal(await token.totalSupply(), initialSupply + 1000);
        assert.equal(await token.balanceOf(holder), 1000);
        const result = await token.burn(100, { from: holder });
        // Test the Transfer event (burn to the zero address)
        let eventName = result.logs[0].event;
        let eventRes = result.logs[0].args;
        assert.equal(eventName, "Transfer");
        assert.equal(eventRes[0], holder);
        assert.equal(eventRes[1], "0x0000000000000000000000000000000000000000");
        assert.equal(eventRes[2], 100);

        assert.equal(result.receipt.status, 1);
        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 1000 - 100);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 0);
        assert.equal(await token.balanceOf(recipient2), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1000 - 100);
      });

      it("Transfer 100 tokens from holder to recipient", async () => {
        assert.equal(await token.totalSupply(), initialSupply + 1000 - 100);
        assert.equal(await token.balanceOf(holder), 900);
        const result = await token.transfer(recipient, 100, { from: holder });
        // Test the Transfer event
        let eventName = result.logs[0].event;
        let eventRes = result.logs[0].args;
        assert.equal(eventName, "Transfer");
        assert.equal(eventRes[0], holder);
        assert.equal(eventRes[1], recipient);
        assert.equal(eventRes[2], 100);

        assert.equal(result.receipt.status, 1);
        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 800);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 100);
        assert.equal(await token.balanceOf(recipient2), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1000 - 100);
      });

      it("only minters can mint", async () => {
        assert.equal(await token.isMinter(recipient), false);
        await expectRevert.unspecified(
          token.mint(recipient2, 200, { from: recipient })
        );
      });

      it("recipient cant transfer 200 tokens to recipient2 with no balance", async () => {
        await expectRevert.unspecified(
          token.transfer(recipient2, 200, { from: recipient })
        );
      });

      it("recipient cant transferFrom 200 tokens from holder to recipient2 no balance", async () => {
        await expectRevert.unspecified(
          token.transferFrom(holder, recipient2, 200, {
            from: notary,
          })
        );
      });

      it("notary can transferFrom(holder, recipient2, 200) when holder uses approve", async () => {
        await expectRevert.unspecified(
          token.transfer(recipient2, 200, { from: notary })
        );

        assert.equal(await token.totalSupply(), initialSupply + 1000 - 100);
        assert.equal(await token.balanceOf(holder), 800);
        assert.equal(await token.allowance(holder, notary), 0);

        const result = await token.approve(notary, 200, { from: holder });
        assert.equal(result.receipt.status, 1);
        // Test the Approval event
        let eventName1 = result.logs[0].event;
        let eventRes1 = result.logs[0].args;
        assert.equal(eventName1, "Approval");
        assert.equal(eventRes1[0], holder);
        assert.equal(eventRes1[1], notary);
        assert.equal(eventRes1[2], 200);

        assert.equal(await token.allowance(holder, notary), 200);
        const result2 = await token.transferFrom(holder, recipient2, 200, {
          from: notary,
        });
        assert.equal(result2.receipt.status, 1);
        // Test the Approval and Transfer events for TransferFrom operation
        let eventName2 = result2.logs[0].event;
        let eventRes2 = result2.logs[0].args;
        assert.equal(eventName2, "Approval");
        assert.equal(eventRes2[0], holder);
        assert.equal(eventRes2[1], notary);
        assert.equal(eventRes2[2], 0);

        let eventName3 = result2.logs[1].event;
        let eventRes3 = result2.logs[1].args;
        assert.equal(eventName3, "Transfer");
        assert.equal(eventRes3[0], holder);
        assert.equal(eventRes3[1], recipient2);
        assert.equal(eventRes3[2], 200);

        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 600);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient2), 200);
        assert.equal(await token.allowance(holder, notary), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1000 - 100);
      });

      it("notary can transferFrom(holder, recipient2, 200) when holder uses increaseAllowance and decreaseAllowance", async () => {
        await expectRevert.unspecified(
          token.transfer(recipient2, 200, { from: notary })
        );

        assert.equal(await token.totalSupply(), initialSupply + 1000 - 100);
        assert.equal(await token.balanceOf(holder), 600);
        assert.equal(await token.allowance(holder, notary), 0);

        const result = await token.increaseAllowance(notary, 300, {
          from: holder,
        });
        assert.equal(result.receipt.status, 1);
        // Test the Approval event
        let eventName1 = result.logs[0].event;
        let eventRes1 = result.logs[0].args;
        assert.equal(eventName1, "Approval");
        assert.equal(eventRes1[0], holder);
        assert.equal(eventRes1[1], notary);
        assert.equal(eventRes1[2], 300);

        const result2 = await token.decreaseAllowance(notary, 100, {
          from: holder,
        });
        assert.equal(result2.receipt.status, 1);
        // Test the Approval event
        let eventName2 = result2.logs[0].event;
        let eventRes2 = result2.logs[0].args;
        assert.equal(eventName2, "Approval");
        assert.equal(eventRes2[0], holder);
        assert.equal(eventRes2[1], notary);
        assert.equal(eventRes2[2], 200);

        assert.equal(await token.allowance(holder, notary), 200);
        const result3 = await token.transferFrom(holder, recipient2, 200, {
          from: notary,
        });
        assert.equal(result3.receipt.status, 1);
        // Test the Approval and Transfer events for TransferFrom operation
        let eventName3 = result3.logs[0].event;
        let eventRes3 = result3.logs[0].args;
        assert.equal(eventName3, "Approval");
        assert.equal(eventRes3[0], holder);
        assert.equal(eventRes3[1], notary);
        assert.equal(eventRes3[2], 0);

        let eventName4 = result3.logs[1].event;
        let eventRes4 = result3.logs[1].args;
        assert.equal(eventName4, "Transfer");
        assert.equal(eventRes4[0], holder);
        assert.equal(eventRes4[1], recipient2);
        assert.equal(eventRes4[2], 200);

        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 400);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 100);
        assert.equal(await token.balanceOf(recipient2), 400);
        assert.equal(await token.allowance(holder, recipient), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1000 - 100);
      });

      it("notary can burnFrom(holder, 200) when holder uses increaseAllowance and decreaseAllowance", async () => {
        await expectRevert.unspecified(
          token.transfer(recipient2, 200, { from: notary })
        );

        assert.equal(await token.totalSupply(), initialSupply + 1000 - 100);
        assert.equal(await token.balanceOf(holder), 400);
        assert.equal(await token.allowance(holder, notary), 0);

        const result = await token.increaseAllowance(notary, 300, {
          from: holder,
        });
        assert.equal(result.receipt.status, 1);
        // Test the Approval event
        let eventName1 = result.logs[0].event;
        let eventRes1 = result.logs[0].args;
        assert.equal(eventName1, "Approval");
        assert.equal(eventRes1[0], holder);
        assert.equal(eventRes1[1], notary);
        assert.equal(eventRes1[2], 300);

        const result2 = await token.decreaseAllowance(notary, 100, {
          from: holder,
        });
        assert.equal(result2.receipt.status, 1);
        // Test the Approval event
        let eventName2 = result2.logs[0].event;
        let eventRes2 = result2.logs[0].args;
        assert.equal(eventName2, "Approval");
        assert.equal(eventRes2[0], holder);
        assert.equal(eventRes2[1], notary);
        assert.equal(eventRes2[2], 200);

        assert.equal(await token.allowance(holder, notary), 200);
        const result3 = await token.burnFrom(holder, 200, { from: notary });
        assert.equal(result3.receipt.status, 1);
        // Test the Approval and Transfer events for BurnFrom operation
        let eventName3 = result3.logs[0].event;
        let eventRes3 = result3.logs[0].args;
        assert.equal(eventName3, "Approval");
        assert.equal(eventRes3[0], holder);
        assert.equal(eventRes3[1], notary);
        assert.equal(eventRes3[2], 0);

        let eventName4 = result3.logs[1].event;
        let eventRes4 = result3.logs[1].args;
        assert.equal(eventName4, "Transfer");
        assert.equal(eventRes4[0], holder);
        assert.equal(
          eventRes4[1],
          "0x0000000000000000000000000000000000000000"
        );
        assert.equal(eventRes4[2], 200);

        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 200);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 100);
        assert.equal(await token.balanceOf(recipient2), 400);
        assert.equal(await token.allowance(holder, notary), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1000 - 300);
      });

      it("notary can burnFrom(holder, 200) when holder uses approve", async () => {
        await expectRevert.unspecified(
          token.transfer(recipient2, 200, { from: notary })
        );

        assert.equal(await token.totalSupply(), initialSupply + 1000 - 300);
        assert.equal(await token.balanceOf(holder), 200);
        assert.equal(await token.allowance(holder, notary), 0);

        const result = await token.approve(notary, 200, { from: holder });
        assert.equal(result.receipt.status, 1);
        // Test the Approval event
        let eventName1 = result.logs[0].event;
        let eventRes1 = result.logs[0].args;
        assert.equal(eventName1, "Approval");
        assert.equal(eventRes1[0], holder);
        assert.equal(eventRes1[1], notary);
        assert.equal(eventRes1[2], 200);

        assert.equal(await token.allowance(holder, notary), 200);
        const result2 = await token.burnFrom(holder, 200, { from: notary });
        assert.equal(result2.receipt.status, 1);

        // Test the Approval and Transfer events for BurnFrom operation
        let eventName2 = result2.logs[0].event;
        let eventRes2 = result2.logs[0].args;
        assert.equal(eventName2, "Approval");
        assert.equal(eventRes2[0], holder);
        assert.equal(eventRes2[1], notary);
        assert.equal(eventRes2[2], 0);

        let eventName3 = result2.logs[1].event;
        let eventRes3 = result2.logs[1].args;
        assert.equal(eventName3, "Transfer");
        assert.equal(eventRes3[0], holder);
        assert.equal(
          eventRes3[1],
          "0x0000000000000000000000000000000000000000"
        );
        assert.equal(eventRes3[2], 200);

        assert.equal(await token.balanceOf(deployer), initialSupply);
        assert.equal(await token.balanceOf(holder), 0);
        assert.equal(await token.balanceOf(sender), 0);
        assert.equal(await token.balanceOf(recipient), 100);
        assert.equal(await token.balanceOf(recipient2), 400);
        assert.equal(await token.allowance(holder, notary), 0);
        assert.equal(await token.balanceOf(notary), 0);
        assert.equal(await token.totalSupply(), initialSupply + 1000 - 500);
      });

      it("recipient2 cant decreaseAllowance by 50, when he approves 100 to notary and in-between notary spends them all)", async () => {
        // Recipient2 approve 100 token to Notary
        const result = await token.approve(notary, 100, { from: recipient2 });
        assert.equal(result.receipt.status, 1);
        // Test the Approval event
        let eventName1 = result.logs[0].event;
        let eventRes1 = result.logs[0].args;
        assert.equal(eventName1, "Approval");
        assert.equal(eventRes1[0], recipient2);
        assert.equal(eventRes1[1], notary);
        assert.equal(eventRes1[2], 100);

        // Notary send all his spending allowance from recipient2 to himslef
        const result2 = await token.transferFrom(recipient2, notary, 100, {
          from: notary,
        });
        assert.equal(result2.receipt.status, 1);
        // Test the Approval and Transfer events for TransferFrom operation
        let eventName2 = result2.logs[0].event;
        let eventRes2 = result2.logs[0].args;
        assert.equal(eventName2, "Approval");
        assert.equal(eventRes2[0], recipient2);
        assert.equal(eventRes2[1], notary);
        assert.equal(eventRes2[2], 0);

        let eventName3 = result2.logs[1].event;
        let eventRes3 = result2.logs[1].args;
        assert.equal(eventName3, "Transfer");
        assert.equal(eventRes3[0], recipient2);
        assert.equal(eventRes3[1], notary);
        assert.equal(eventRes3[2], 100);

        // Recipient2 decrease notary allowance by 50 (which is now 0)
        await expectRevert.unspecified(
          token.decreaseAllowance(notary, 50, {
            from: holder,
          })
        );
      });

      it("recipient2 cant transfer tokens not being a token controller", async () => {
        await expectRevert.unspecified(
          token.tokenTransfer(
            {
              token: token.address,
              payload: web3.utils.asciiToHex("a"),
              partition: web3.utils.asciiToHex(
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
              ),
              operator: recipient2,
              from: recipient,
              to: holder,
              tokenId: 1,
              value: 1,
              data: web3.utils.asciiToHex("a"),
              operatorData: web3.utils.asciiToHex("a"),
            },
            {
              from: recipient2,
            }
          )
        );
      });

      it("Mint more than maxSupply tokens to holder", async () => {
        await expectRevert.unspecified(
          token.mint(holder, 6000, {
            from: deployer,
          })
        );
      });

      it("upgradeTo reverts if non-owner executes it", async () => {
        let newLogic = await ERC20LogicMock.new();

        await expectRevert.unspecified(
          token.upgradeTo(newLogic.address, "0x", { from: notary })
        );
      });

      it("when the owner upgrades, it's successful", async () => {
        let newLogic = await ERC20LogicMock.new();

        const res = await token.upgradeTo(newLogic.address, "0x", {
          from: deployer,
        });

        //Bind the token address to the mock ABI
        //so we can invoke new functions
        const upgradedTokenApi = await ERC20LogicMock.at(token.address);

        //Only mock contract has the isMock function
        assert.equal(await upgradedTokenApi.isMock(), "This is a mock!");

        // Test the Upgraded event
        let eventName = res.logs[0].event;
        let eventRes = res.logs[0].args;

        assert.equal(eventName, "Upgraded");
        assert.equal(eventRes[0], newLogic.address);
      });

      xit("Deploys a new token with holder as the owner", async () => {
        const initialSupply = 1000;
        const maxSupply = 5000;
        let tokenLogic;
        let tokenProxy;
        let token;

        tokenLogic = await ERC20Logic.new();
        tokenProxy = await ERC20Extendable.new(
          "ERC20Extendable2",
          "DAU",
          true,
          false,
          holder,
          initialSupply,
          maxSupply,
          tokenLogic.address
        );

        token = await ERC20Logic.at(tokenProxy.address);

        //combine both objects so we can use all the functions
        token = Object.assign(token, tokenLogic);

        assert.equal(await token.owner(), holder);
        assert.equal(await token.isMinter(holder), true);
        assert.equal(await token.name(), "ERC20Extendable2");
        assert.equal(await token.symbol(), "DAU");
        assert.equal(await token.totalSupply(), initialSupply);
        assert.equal(await token.maxSupply(), maxSupply);
        assert.equal(await token.mintingAllowed(), true);
        assert.equal(await token.burningAllowed(), false);
        assert.equal(await token.balanceOf(holder), initialSupply);
        assert.equal(await token.tokenStandard(), 0);
      });
    });
  }
);
