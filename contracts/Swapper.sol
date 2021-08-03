//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./interfaces/IOneSplit.sol";
import "./interfaces/IERC20.sol";

contract Swapper {
  IOneSplit oneSplit;

  constructor(IOneSplit _oneSplit) {
    console.log("Swapper deployed");
    oneSplit = _oneSplit;
  }

  function swapOneInch(IERC20 _from, IERC20 _to, uint256 _amount) public {
    _from.transferFrom(msg.sender, address(this), _amount);
    _from.approve(address(oneSplit), _amount);
    (uint256 returnAmount, uint256[] memory distribution) = oneSplit.getExpectedReturn(_from, _to, _amount, 10, 0);
    oneSplit.swap(_from, _to, _amount, returnAmount, distribution, 0);
    _to.transfer(msg.sender, returnAmount);
  }
}
