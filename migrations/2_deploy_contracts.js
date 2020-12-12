const Auction = artifacts.require('./Auction.sol');
const AuctionFactory = artifacts.require('AuctionFactory.sol');

// const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  // await deployProxy(AuctionFactory, [], { deployer, initializer: 'initialize' });
  await deployer.deploy(Auction);
  await deployer.deploy(AuctionFactory);
};
