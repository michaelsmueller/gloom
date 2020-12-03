// const Auction = artifacts.require('./Auction.sol');
const AuctionFactory = artifacts.require('./AuctionFactory.sol');

module.exports = function (deployer) {
  // deployer.deploy(Auction);
  deployer.deploy(AuctionFactory);
};
