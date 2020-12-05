const AuctionFactory = artifacts.require('AuctionFactory');
const Auction = artifacts.require('Auction');
const truffleAssert = require('truffle-assertions');
const {
  tokenAmount,
  tokenContractAddress,
  startDateTime,
  endDateTime,
} = require('../data/testData');

contract('Auction', accounts => {
  const admin = accounts[0];
  const seller = accounts[1];
  const bidder1 = accounts[2];
  const bidder2 = accounts[3];
  const attacker = accounts[9];
  const DEPOSIT = web3.utils.toWei('1', 'ether');

  beforeEach(async () => {
    factoryInstance = await AuctionFactory.new({ from: admin });
    const tx = await createAuction();
    const { auction } = tx.logs[0].args;
    auctionInstance = await Auction.at(auction);
  });

  const createAuction = async () => {
    return await factoryInstance.createAuction(
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
