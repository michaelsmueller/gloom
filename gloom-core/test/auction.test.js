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
  const DEPOSIT_BN = new BN(DEPOSIT);

  const TOKENS = new BN(100);
  const DECIMALS = new BN(18);
  const TEN = new BN(10);
  const tokenAmount = TOKENS.mul(TEN.pow(DECIMALS));
  const tokenContractAddress = '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e'; // YFI

  beforeEach(async () => {
    factoryInstance = await AuctionFactory.new({ from: admin });
    logicInstance = await Auction.deployed();
    logicAddress = logicInstance.address;
    const tx = await createAuction();
    const { auction } = tx.logs[1].args;
    auctionInstance = await Auction.at(auction);
  });

  const createAuction = async () => {
    return await factoryInstance.createAuction(logicAddress, tokenAmount, tokenContractAddress, { from: seller });
  };

  it('should accept a deposit from seller', async () => {
    await auctionInstance.receiveSellerDeposit({ from: seller, value: DEPOSIT });
  });

  it('should store the seller deposit amount', async () => {
    const tx = await auctionInstance.receiveSellerDeposit({ from: seller, value: DEPOSIT });
    let sellerDeposit;
    truffleAssert.eventEmitted(tx, 'LogSellerDepositReceived', event => {
      sellerDeposit = event.sellerDeposit;
      return event.seller === seller;
    });
    assert(sellerDeposit.eq(DEPOSIT_BN), 'incorrect deposit amount');
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

  it('should not allow someone other than seller to set up bidders', async () => {
    const bidderAddresses = [bidder1, bidder2];
    await truffleAssert.reverts(
      auctionInstance.setupBidders(DEPOSIT, bidderAddresses, { from: attacker }),
      'Sender not authorized',
    );
  });
});
