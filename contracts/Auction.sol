// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

// import '@openzeppelin/contracts/proxy/Initializable.sol';
// import '@openzeppelin/upgrades/contracts/Initializable.sol';

contract Auction {
  address public factory;
  address public seller;
  uint256 public sellerDeposit;
  uint256 public bidderDeposit;
  uint256 public tokenAmount;
  address public tokenContractAddress;
  uint256 public startDateTime;
  uint256 public endDateTime;

  struct Bidder {
    bool isInvited;
    uint256 balance;
    bytes32 bidCommit;
    uint64 bidCommitBlock;
    bool bidRevealed;
  }

  mapping(address => Bidder) public bidders;
  address[] public bidderAddresses;

  event LogSellerDepositReceived(address indexed seller, uint256 sellerDeposit);
  event LogBidderDepositReceived(address indexed bidder, uint256 bidderDeposit);
  event LogBidderInvited(address indexed bidder);
  event LogBidCommitted(address indexed bidder, bytes32 bidHash, uint256 bidCommitBlock);
  event LogBidRevealed(address indexed bidder, bytes32 bidHex, bytes32 salt);

  constructor(
    address _seller,
    uint256 _tokenAmount,
    address _tokenContractAddress,
    uint256 _startDateTime,
    uint256 _endDateTime
  ) public {
    factory = msg.sender;
    seller = _seller;
    tokenAmount = _tokenAmount;
    tokenContractAddress = _tokenContractAddress;
    startDateTime = _startDateTime;
    endDateTime = _endDateTime;
  }

  function receiveSellerDeposit() external payable {
    // consider using initialize or other modifier to prevent seller from changing deposit
    require(msg.sender == seller, 'Sender not authorized');
    sellerDeposit = msg.value;
    emit LogSellerDepositReceived(msg.sender, msg.value);
  }

  function getDateTimes() external view returns (uint256, uint256) {
    return (startDateTime, endDateTime);
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

  function inviteBidder(address bidderAddress) private {
    require(!isInvitedBidder(bidderAddress), 'Bidder already exists');
    bidders[bidderAddress].isInvited = true;
    bidderAddresses.push(bidderAddress);
    emit LogBidderInvited(bidderAddress);
  }

  function setupBidders(uint256 _bidderDeposit, address[] calldata _bidderAddresses) external {
    require(msg.sender == seller, 'Sender not authorized');
    bidderDeposit = _bidderDeposit;
    for (uint256 i = 0; i < _bidderAddresses.length; i++) {
      inviteBidder(_bidderAddresses[i]);
    }
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
    bidders[msg.sender].bidRevealed = false;
    emit LogBidCommitted(msg.sender, bidders[msg.sender].bidCommit, bidders[msg.sender].bidCommitBlock);
  }

  function submitBid(bytes32 dataHash) external payable {
    require(isInvitedBidder(msg.sender), 'Sender not authorized');
    receiveBidderDeposit();
    commitBid(dataHash);
  }

  function getSaltedHash(bytes32 data, bytes32 salt) public view returns (bytes32) {
    return keccak256(abi.encodePacked(address(this), data, salt));
  }

  function revealBid(bytes32 bidHex, bytes32 salt) external {
    require(bidders[msg.sender].bidRevealed == false, 'Bid already revealed');
    bidders[msg.sender].bidRevealed = true;
    require(getSaltedHash(bidHex, salt) == bidders[msg.sender].bidCommit, 'Revealed hash does not match');
    emit LogBidRevealed(msg.sender, bidHex, salt);
  }
}
