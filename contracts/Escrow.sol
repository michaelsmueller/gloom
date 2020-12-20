// SPDX-License-Identifier: MIT
pragma solidity ^0.5.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/upgrades/contracts/Initializable.sol';
import './MikeToken.sol';

contract Escrow is Initializable {
  address private auction;
  address private seller;
  address private buyer;
  uint256 private tokenAmount;
  address private tokenContractAddress;
  uint256 private winningBid;

  uint256 private tokenBalance;
  uint256 private balance;
  bool private sellerOk;
  bool private buyerOk;

  modifier onlySeller {
    require(msg.sender == seller, 'Sender not authorized');
    _;
  }

  modifier onlyBuyer {
    require(msg.sender == buyer, 'Sender not authorized');
    _;
  }

  modifier onlySellerOrBuyer {
    require(msg.sender == seller || msg.sender == buyer, 'Sender not authorized');
    _;
  }

  event LogSellerDelivered(address indexed seller, uint256 tokenAmount);
  event LogBuyerPaid(address indexed buyer, uint256 amount);
  event LogSellerWithdrew(address indexed seller, uint256 amount);
  event LogBuyerWithdrew(address indexed buyer, uint256 tokenAmount);

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
    winningBid = uint256(_winningBid);
  }

  function getTokenAmount() external view onlySellerOrBuyer returns (uint256) {
    return tokenAmount;
  }

  function getTokenContractAddress() external view onlySellerOrBuyer returns (address) {
    return tokenContractAddress;
  }

  function getWinningBid() external view onlySellerOrBuyer returns (uint256) {
    return winningBid;
  }

  function sellerDelivery() external onlySeller {
    require(IERC20(tokenContractAddress).transferFrom(msg.sender, address(this), tokenAmount), 'Transfer failed');
    tokenBalance += tokenAmount;
    sellerOk = true;
    emit LogSellerDelivered(msg.sender, tokenAmount);
  }

  function buyerPayment() external payable onlyBuyer {
    require(msg.value == winningBid, 'Incorrect amount');
    balance += msg.value;
    buyerOk = true;
    emit LogBuyerPaid(msg.sender, msg.value);
  }

  function bothOk() public view onlySellerOrBuyer returns (bool) {
    return sellerOk && buyerOk;
  }

  function sellerWithdraw() external payable onlySeller {
    require(bothOk(), 'Escrow is not complete');
    require(address(this).balance >= winningBid, 'Insufficient balance');
    balance -= winningBid;
    (bool success, ) = msg.sender.call.value(winningBid)('');
    require(success, 'Transfer failed');
    emit LogSellerWithdrew(msg.sender, winningBid);
  }

  function buyerWithdraw() external onlyBuyer {
    require(bothOk(), 'Escrow is not complete');
    require(IERC20(tokenContractAddress).balanceOf(address(this)) >= tokenAmount, 'Insufficient balance');
    tokenBalance -= tokenAmount;
    require(IERC20(tokenContractAddress).transfer(msg.sender, tokenAmount), 'Transfer failed');
    emit LogBuyerWithdrew(msg.sender, tokenAmount);
  }
}
