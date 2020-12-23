const Auction = artifacts.require('./Auction.sol');
const AuctionFactory = artifacts.require('./AuctionFactory.sol');
const MikeToken = artifacts.require('./MikeToken.sol');

module.exports = function (deployer) {
  deployer.deploy(Auction);
  deployer.deploy(AuctionFactory);
  deployer.deploy(MikeToken);
};
