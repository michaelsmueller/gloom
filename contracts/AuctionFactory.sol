// SPDX-License-Identifier: MIT
pragma solidity ^0.5.3;

// import '@openzeppelin/upgrades/contracts/Initializable.sol';
import '@openzeppelin/upgrades/contracts/upgradeability/ProxyFactory.sol';
import './Auction.sol';

contract AuctionFactory is ProxyFactory {
  address public admin;
  address[] private auctionAddresses;
  mapping(address => bool) public auctionExists;
  mapping(address => address) public auctionBy;
  mapping(address => address) public auctionInvited;

  event LogAuctionCreated(address indexed auction, address indexed seller);
  event LogBidderRegistered(address indexed auction, address indexed bidder);

  constructor() public {
    admin = msg.sender;
  }

  function getAddresses() external view returns (address[] memory) {
    return auctionAddresses;
  }

  function getAuctionBy() external view returns (address) {
    return auctionBy[msg.sender];
  }

  function getAuctionInvited() external view returns (address) {
    return auctionInvited[msg.sender];
  }

  function createAuction(
    address logic,
    uint256 tokenAmount,
    address tokenContractAddress,
    uint256 startDateTime,
    uint256 endDateTime
  ) external {
    address seller = msg.sender;
    bytes memory payload =
      abi.encodeWithSignature(
        'initialize(address,uint256,address,uint256,uint256)',
        seller,
        tokenAmount,
        tokenContractAddress,
        startDateTime,
        endDateTime
      );
    address auction = deployMinimal(logic, payload);
    auctionAddresses.push(auction);
    auctionExists[auction] = true;
    auctionBy[seller] = auction;
    emit LogAuctionCreated(auction, seller);
  }

  function registerBidder(address bidder, address auction) external {
    require(auctionExists[auction], 'Sender not authorized');
    auctionInvited[bidder] = auction;
    emit LogBidderRegistered(auction, bidder);
  }
}
