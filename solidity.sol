// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract TEST {
address public owner = msg.sender;// owner
address public txOrigin = tx.origin; // origin owner

 event Hello(uint indexed a, uint b, uint indexed c, uint d);
 
  function fun(uint a) public {
     emit Hello(a++, a, a, a);
  }
}

// c > a > b > d
