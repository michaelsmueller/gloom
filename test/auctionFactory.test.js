const AuctionFactory = artifacts.require('AuctionFactory');
const Auction = artifacts.require('Auction');
const truffleAssert = require('truffle-assertions');
const { tokenAmount, tokenContractAddress, startDateTime, endDateTime } = require('../data/testData');

contract('AuctionFactory', accounts => {
  let factoryInstance, logicInstance, logicAddress;
  const admin = accounts[0];
  const seller = accounts[1];

  beforeEach(async () => {
    factoryInstance = await AuctionFactory.new({ from: admin });
    logicInstance = await Auction.deployed();
    logicAddress = logicInstance.address;
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

  it('should should set msg.sender as admin', async () => {
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
      return (createdAuction = event.auction);
    });
    const addresses = await factoryInstance.getAddresses();
    assert.isTrue(addresses.includes(createdAuction));
  });
});
