// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import './Auction.sol';

// import '@openzeppelin/contracts/access/Ownable.sol';

contract AuctionFactory {
  Auction[] public auctionAddresses;
  address public admin;

  event AuctionCreated(Auction auction, address indexed seller);

  constructor() public {
    admin = msg.sender;
  }

  function getAddresses() public view returns (Auction[] memory) {
    return auctionAddresses;
  }

  function createAuction(
    uint256 tokenAmount,
    address tokenContractAddress,
    uint256 startDateTime,
    uint256 endDateTime,
    address seller
  ) public returns (address) {
    Auction auction = new Auction(tokenAmount, tokenContractAddress, startDateTime, endDateTime);
    auction.registerSeller(seller);
    auctionAddresses.push(auction);
    emit AuctionCreated(auction, seller);
  }
}
