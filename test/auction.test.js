const AuctionFactory = artifacts.require('AuctionFactory');
const Auction = artifacts.require('Auction');
const truffleAssert = require('truffle-assertions');
const { BN } = web3.utils;

contract('Auction', accounts => {
  let factoryInstance, logicAddress, auctionInstance;
  const admin = accounts[0];
  const seller = accounts[1];
  const bidder1 = accounts[2];
  const bidder2 = accounts[3];
  const attacker = accounts[9];
  const DEPOSIT = web3.utils.toWei('1', 'ether');
  const TOKENS = new BN(100);
  const DECIMALS = new BN(18);
  const TEN = new BN(10);
  const tokenAmount = TOKENS.mul(TEN.pow(DECIMALS));
  const tokenContractAddress = '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e'; // YFI
  const startDateTime = 1609488000000; // 1 Jan 2020 8:00 UTC
  const endDateTime = 1612166400000; // 1 Feb 2020 8:00 UTC

  beforeEach(async () => {
    factoryInstance = await AuctionFactory.new({ from: admin });
    logicInstance = await Auction.deployed();
    logicAddress = logicInstance.address;
    const tx = await createAuction();
    const { auction } = tx.logs[1].args;
    auctionInstance = await Auction.at(auction);
  });

  const createAuction = async () => {
    return await factoryInstance.createAuction(
      logicAddress,
      tokenAmount,
      tokenContractAddress,
      startDateTime,
      endDateTime,
      { from: seller },
    );
  };

  it('should accept a deposit from seller', async () => {
    await auctionInstance.receiveSellerDeposit({ from: seller, value: DEPOSIT });
  });

  it('should store the seller deposit amount', async () => {
    await auctionInstance.receiveSellerDeposit({ from: seller, value: DEPOSIT });
    const depositedAmount = await auctionInstance.sellerDeposit.call();
    assert.equal(DEPOSIT, depositedAmount);
  });

  it('should not accept a deposit from someone other than seller', async () => {
    await truffleAssert.reverts(
      auctionInstance.receiveSellerDeposit({ from: attacker, value: DEPOSIT }),
      'Sender not authorized',
    );
  });

  it('should allow seller to set up bidders', async () => {
    const bidderAddresses = [bidder1, bidder2];
    await auctionInstance.setupBidders(DEPOSIT, bidderAddresses, { from: seller });
  });

  it('should store the bidder deposit amount', async () => {
    const bidderAddresses = [bidder1, bidder2];
    await auctionInstance.setupBidders(DEPOSIT, bidderAddresses, { from: seller });
    const bidderDeposit = await auctionInstance.bidderDeposit.call();
    assert.equal(DEPOSIT, bidderDeposit);
  });

  it('should not allow someone other than seller to set up bidders', async () => {
    const bidderAddresses = [bidder1, bidder2];
    await truffleAssert.reverts(
      auctionInstance.setupBidders(DEPOSIT, bidderAddresses, { from: attacker }),
      'Sender not authorized',
    );
  });
});
