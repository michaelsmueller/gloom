// SPDX-License-Identifier: MIT
pragma solidity ^0.5.3;

import '@openzeppelin/upgrades/contracts/Initializable.sol';
import './AuctionFactory.sol';
import './Escrow.sol';

contract Auction is Initializable {
  address public factory;
  address public seller;
  address public winner;
  uint256 public sellerDeposit;
  uint256 public bidderDeposit;
  uint256 public tokenAmount;
  address public tokenContractAddress;
  uint256 public startDateTime;
  uint256 public endDateTime;

  Escrow public escrow;

  enum Phase { Setup, Commit, Reveal, Deliver, Withdraw, Done }
  Phase public phase;

  struct Bidder {
    bool isInvited;
    uint256 balance;
    bytes32 bidCommit;
    uint64 bidCommitBlock;
    bool isBidRevealed;
    bytes32 bidHex;
  }

  mapping(address => Bidder) public bidders;
  address[] public bidderAddresses;

  event LogSellerDepositReceived(address indexed seller, uint256 sellerDeposit);
  event LogBidderDepositReceived(address indexed bidder, uint256 bidderDeposit);
  event LogBidderInvited(address indexed bidder);
  event LogBidCommitted(address indexed bidder, bytes32 bidHash, uint256 bidCommitBlock);
  event LogBidRevealed(address indexed bidder, bytes32 bidHex, bytes32 salt);
  event LogSetWinner(address indexed bidder);

  modifier onlySeller {
    require(msg.sender == seller, 'Sender not authorized');
    _;
  }

  modifier inSetup {
    require(phase == Phase.Setup, 'Action not authorized now');
    _;
  }

  modifier inCommit {
    require(phase == Phase.Commit, 'Action not authorized now');
    _;
  }
  
  modifier inReveal {
    require(phase == Phase.Reveal, 'Action not authorized now');
    _;
  }

  modifier inDeliver {
    require(phase == Phase.Deliver, 'Action not authorized now');
    _;
  }

  function initialize(
    address _seller,
    uint256 _tokenAmount,
    address _tokenContractAddress,
    uint256 _startDateTime,
    uint256 _endDateTime
  ) public initializer {
    // Ownable.initialize(_seller);
    factory = msg.sender;
    seller = _seller;
    tokenAmount = _tokenAmount;
    tokenContractAddress = _tokenContractAddress;
    startDateTime = _startDateTime;
    endDateTime = _endDateTime;
    phase = Phase.Setup;
  }

  function getBalance() external view onlySeller returns(uint) {
    return address(this).balance;
  }

  function receiveSellerDeposit() external payable onlySeller inSetup {
    // consider using initialize or other modifier to prevent seller from changing deposit
    sellerDeposit = msg.value;
    emit LogSellerDepositReceived(msg.sender, msg.value);
  }

  function getPhase() external view returns (Phase) {
    require(msg.sender == seller || isInvitedBidder(msg.sender), 'Sender not authorized');
    return phase;
  }

  function getDateTimes() external view returns (uint256, uint256) {
    return (startDateTime, endDateTime);
  }

  function getAsset() external view returns (uint256, address) {
    return (tokenAmount, tokenContractAddress);
  }
  function getBidders() external view returns (address[] memory) {
    return bidderAddresses;
  }

  function getBidderDeposit() external view returns (uint256) {
    return bidderDeposit;
  }

  function isInvitedBidder(address bidderAddress) private view returns (bool) {
    return bidders[bidderAddress].isInvited;
  }

  function registerBidderAtFactory(address bidderAddress) private inSetup {
    AuctionFactory auctionFactory = AuctionFactory(factory);
    auctionFactory.registerBidder(bidderAddress, address(this));
  }

  function inviteBidder(address bidderAddress) private inSetup {
    require(!isInvitedBidder(bidderAddress), 'Bidder already exists');
    bidders[bidderAddress].isInvited = true;
    bidderAddresses.push(bidderAddress);
    registerBidderAtFactory(bidderAddress);
    emit LogBidderInvited(bidderAddress);
  }

  function setupBidders(uint256 _bidderDeposit, address[] calldata _bidderAddresses) external onlySeller inSetup {
    bidderDeposit = _bidderDeposit;
    for (uint256 i = 0; i < _bidderAddresses.length; i++) {
      inviteBidder(_bidderAddresses[i]);
    }
  }

  function setWinner() internal {
    address _winner = bidderAddresses[0];
    for (uint256 i = 1; i < bidderAddresses.length; i++) {
      address current = bidderAddresses[i];
      if (bidders[current].bidHex > bidders[_winner].bidHex) {
        _winner = current;
      }
    }
    winner = _winner;
    emit LogSetWinner(winner);
  }

  function startCommit() external onlySeller inSetup {
    phase = Phase.Commit;
  }

  function startReveal() external onlySeller inCommit {
    phase = Phase.Reveal;
  }

  function startDeliver() external onlySeller inReveal {
    phase = Phase.Deliver;
    setWinner();
    deployEscrow();
  }

  function startWithdraw() external onlySeller inDeliver {
    phase = Phase.Withdraw;
  }

  function receiveBidderDeposit() private {
    // consider using initialize or other modifier to prevent bidder from changing deposit
    require(msg.value == bidderDeposit, 'Deposit is not required amount');
    bidders[msg.sender].balance += msg.value;
    emit LogBidderDepositReceived(msg.sender, msg.value);
  }

  function commitBid(bytes32 dataHash) private {
    bidders[msg.sender].bidCommit = dataHash;
    bidders[msg.sender].bidCommitBlock = uint64(block.number);
    bidders[msg.sender].isBidRevealed = false;
    emit LogBidCommitted(msg.sender, bidders[msg.sender].bidCommit, bidders[msg.sender].bidCommitBlock);
  }

  function submitBid(bytes32 dataHash) external payable inCommit {
    require(isInvitedBidder(msg.sender), 'Sender not authorized');
    receiveBidderDeposit();
    commitBid(dataHash);
  }

  function getSaltedHash(bytes32 data, bytes32 salt) public view returns (bytes32) {
    return keccak256(abi.encodePacked(address(this), data, salt));
  }

  function revealBid(bytes32 bidHex, bytes32 salt) external inReveal {
    require(isInvitedBidder(msg.sender), 'Sender not authorized');
    require(bidders[msg.sender].isBidRevealed == false, 'Bid already revealed');
    require(getSaltedHash(bidHex, salt) == bidders[msg.sender].bidCommit, 'Revealed hash does not match');
    bidders[msg.sender].isBidRevealed = true;
    bidders[msg.sender].bidHex = bidHex;
    emit LogBidRevealed(msg.sender, bidHex, salt);
  }

  function deployEscrow() internal {
    escrow = new Escrow();
    bytes32 winningBid = bidders[winner].bidHex;
    escrow.initialize(seller, winner, tokenAmount, tokenContractAddress, winningBid);
  }
}
