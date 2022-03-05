pragma solidity >= 0.8.3;

import './Crowdsale.sol';
import './Whitelist.sol';

contract MyTokenSale is Crowdsale {

    Whitelist _whitelist;
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        Whitelist _white
    )
        Crowdsale(rate, wallet, token)
        
    {
        _whitelist = _white;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal override view virtual {
        require(_whitelist.whitelisted(beneficiary) == true, "ERROR: NOT IN THE WHITELIST");
        require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
        require(weiAmount != 0, "Crowdsale: weiAmount is 0");
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
    }


}