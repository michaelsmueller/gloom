// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import './Auction.sol';

// import '@openzeppelin/contracts/access/Ownable.sol';

contract AuctionFactory {
  Auction[] private auctionAddresses;
  address public admin;

  event AuctionCreated(Auction indexed auction, address indexed seller);

  constructor() public {
    admin = msg.sender;
  }

  function getAddresses() external view returns (Auction[] memory) {
    return auctionAddresses;
  }

  function createAuction(
    uint256 tokenAmount,
    address tokenContractAddress,
    uint256 startDateTime,
    uint256 endDateTime
  ) external {
    address seller = msg.sender;
    Auction auction = new Auction(seller, tokenAmount, tokenContractAddress, startDateTime, endDateTime);
    auctionAddresses.push(auction);
    emit AuctionCreated(auction, seller);
  }
}
