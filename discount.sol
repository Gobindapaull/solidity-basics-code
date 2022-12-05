// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TEST {  
   function Price(uint256 price, uint256 discount) public pure returns(uint256) {
    return price * discount / 100;
   }
}
