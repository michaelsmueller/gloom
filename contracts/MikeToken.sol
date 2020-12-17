pragma solidity ^0.5.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MikeToken is ERC20 {
  string public name = 'MikeToken';
  string public symbol = 'MIKE';
  uint8 public decimals = 0;
  uint public INITIAL_SUPPLY = 1000000;

  constructor() public {
    _mint(msg.sender, INITIAL_SUPPLY);
  }
}
