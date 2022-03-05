pragma solidity >= 0.8.3;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Whitelist is Ownable {

    mapping(address => bool) public whitelisted;

    function whitelisten(address _addr) public onlyOwner {
        bool target = whitelisted[_addr];
        if (target == false) {
            whitelisted[_addr] = true;
        } else {
            whitelisted[_addr] = false;
        }
    }

}