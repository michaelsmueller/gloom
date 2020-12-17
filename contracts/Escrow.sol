// SPDX-License-Identifier: MIT
pragma solidity ^0.5.3;

// import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/upgrades/contracts/Initializable.sol';

contract Escrow is Initializable {
  IERC20 public asset;
  uint public payment;
  address public auction;
  address public seller;
  address public buyer;
  uint256 public tokenAmount;
  address public tokenContractAddress;
  bytes32 public winningBid;

  function initialize(
    address _seller,
    address _buyer,
    uint256 _tokenAmount,
    address _tokenContractAddress,
    bytes32 _winningBid
  ) public initializer {
    auction = msg.sender;
    seller = _seller;
    buyer = _buyer;
    tokenAmount = _tokenAmount;
    tokenContractAddress = _tokenContractAddress;
    winningBid = _winningBid;
  }
  function returnBytes32() public view returns (bytes32) {
    return winningBid;
  }

  function returnInt() public view returns (uint256) {
    // require(msg.sender == buyer, 'Sender not authorized');
    uint256 test = uint256(winningBid);
    // require(msg.value == price);
    // bytes memory output;
    // uint offst = 32;
    // bytes32ToBytes(offst, winningBid, output);
    return test;
  }
}