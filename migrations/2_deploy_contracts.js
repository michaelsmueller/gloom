const SimpleStorage = artifacts.require('./SimpleStorage.sol');
// const Auction = artifacts.require('./Auction.sol');
const AuctionFactory = artifacts.require('./AuctionFactory.sol');

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  // deployer.deploy(Auction);
  deployer.deploy(AuctionFactory);
};
