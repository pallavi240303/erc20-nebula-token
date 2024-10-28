const {expect} = require("chai");
const hre = require("hardhat");

describe("NebulaToken contract" , function(){
    //global variables 
    let Token;
    let NebulaToken;
    let owner;
    let addr1;
    let addr2;
    let tokenCap = 10000000;
    let tokenBlockReward = 50;

    this.beforeEach(async function() {
        Token = await hre.ethers.getContractFactory("NebulaToken");
        [owner , addr1 , addr2] = await hre.ethers.getSigners();

        NebulaToken = await Token.deploy(tokenCap , tokenBlockReward);
    });

    describe("Deployment", function () {
    it("Should set the right owner", async function () {
        console.log("NebulaToken owner : ",NebulaToken.owner())
        console.log("Owner address: ",owner.address)
      expect(await NebulaToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await NebulaToken.balanceOf(owner.address);
      expect(await NebulaToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await NebulaToken.cap();
      expect(Number(hre.ethers.formatEther(cap))).to.equal(tokenCap);
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      let blockReward = await NebulaToken.blockReward();
      console.log(blockReward);
      console.log(tokenBlockReward);
      expect(Number(hre.ethers.formatEther(blockReward))).to.equal(tokenBlockReward);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await NebulaToken.transfer(addr1.address, 50);
      const addr1Balance = await NebulaToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await NebulaToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await NebulaToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await NebulaToken.balanceOf(owner.address);
      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        NebulaToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith;

      // Owner balance shouldn't have changed.
      expect(await NebulaToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await NebulaToken.balanceOf(owner.address);

      // Transfer 100 tokens from owner to addr1.
      await NebulaToken.transfer(addr1.address, 100);

      // Transfer another 50 tokens from owner to addr2.
      await NebulaToken.transfer(addr2.address, 50);

      // Check balances.
      const finalOwnerBalance = await NebulaToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance -BigInt(150));

      const addr1Balance = await NebulaToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await NebulaToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});