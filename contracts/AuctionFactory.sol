// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import './Auction.sol';
// import '@openzeppelin/contracts/access/Ownable.sol';

contract AuctionFactory {
  Auction[] public auctionAddresses;
  address private owner;
  address public wtf;

  event AuctionCreated(Auction auction);

  constructor() public {
    owner = msg.sender;
    wtf = owner;
  }

  function getAddresses() public view returns (Auction[] memory) {
    return auctionAddresses;
  }

  function createAuction() public returns (address) {
    Auction auction = new Auction();
    auctionAddresses.push(auction);
    emit AuctionCreated(auction);
  }
}
