const Auction = artifacts.require('./Auction.sol');
const AuctionFactory = artifacts.require('AuctionFactory.sol');
const MikeToken = artifacts.require('MikeToken.sol');

// const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = function (deployer) {
  // await deployProxy(AuctionFactory, [], { deployer, initializer: 'initialize' });
  deployer.deploy(Auction);
  deployer.deploy(AuctionFactory);
  deployer.deploy(MikeToken);
};
