const AuctionFactory = artifacts.require('AuctionFactory');
const Auction = artifacts.require('Auction');
const truffleAssert = require('truffle-assertions');
const { BN } = web3.utils;

contract('AuctionFactory', accounts => {
  let factoryInstance, logicInstance, logicAddress;
  const admin = accounts[0];
  const seller = accounts[1];
  const bidder = accounts[2];
  const DEPOSIT = web3.utils.toWei('1', 'ether');
  const TOKENS = new BN(100);
  const DECIMALS = new BN(18);
  const TEN = new BN(10);
  const tokenAmount = TOKENS.mul(TEN.pow(DECIMALS));
  const tokenContractAddress = '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e'; // YFI

  before(async () => {
    factoryInstance = await AuctionFactory.new({ from: admin });
    logicInstance = await Auction.deployed();
    logicAddress = logicInstance.address;
  });

  const createAuction = async () => {
    return await factoryInstance.createAuction(logicAddress, tokenAmount, tokenContractAddress, { from: seller });
  };

  it('should set msg.sender as admin', async () => {
    const factoryAdmin = await factoryInstance.admin.call();
    assert.equal(factoryAdmin, admin, 'factory deployer is not admin');
  });

  it('should create an auction', async () => {
    const tx = await createAuction();
    truffleAssert.eventEmitted(tx, 'LogAuctionCreated', event => {
      return event.hasOwnProperty('auction') && event.seller === seller;
    });
  });

  it('should get auction addresses including new contract', async () => {
    const tx = await createAuction();
    let createdAuction;
    truffleAssert.eventEmitted(tx, 'LogAuctionCreated', event => {
      createdAuction = event.auction;
      return event;
    });
    const addresses = await factoryInstance.getAddresses({ from: admin });
    assert.isTrue(addresses.includes(createdAuction));
  });

  it('should register bidder when bidder is set up at auction instance', async () => {
    await createAuction();
    const addresses = await factoryInstance.getAddresses({ from: admin });
    const auctionInstance = await Auction.at(addresses[0]);
    await auctionInstance.setupBidders(DEPOSIT, [bidder], { from: seller });
    const isInvited = await factoryInstance.getAuctionInvited({ from: bidder });
    assert(isInvited);
  });

  it('should allow admin to pause to stop ability to deploy new auctions', async () => {
    await factoryInstance.pauseFactory({ from: admin });
    await truffleAssert.reverts(createAuction(), 'Pausable: paused');
  });
});
