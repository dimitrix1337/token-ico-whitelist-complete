// SPDX-License-Identifier: MIT
pragma solidity  >= 0.8.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract MyToken is ERC20, Ownable {

  constructor () ERC20("MyToken", "MTK") {
    _mint(msg.sender, 1000000);
  }

  function mintToken(uint amount) public onlyOwner {
    _mint(msg.sender, amount);
  }

}
