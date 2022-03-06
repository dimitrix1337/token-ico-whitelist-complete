pragma solidity >= 0.8.3;

import './Crowdsale.sol';
import './Whitelist.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract MyTokenSale is Crowdsale, Ownable {

    Whitelist _whitelist;
    uint from_time;
    uint to_time;
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        Whitelist _white,
        uint time_in_days
    )
        Crowdsale(rate, wallet, token)
        
    {
        _whitelist = _white;
        from_time = block.timestamp;
        to_time = time_in_days;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal override view virtual {
        require(block.timestamp < from_time + to_time, "ERROR: THE CROWDSALE IS EXPIRED");
        require(_whitelist.whitelisted(beneficiary) == true, "ERROR: NOT IN THE WHITELIST");
        require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
        require(weiAmount != 0, "Crowdsale: weiAmount is 0");
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
    }

    function withdrawMoney() public onlyOwner {
        _forwardFunds();
    }

}