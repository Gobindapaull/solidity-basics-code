// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract TEST {
address public owner = msg.sender;// owner
address public txOrigin = tx.origin; // origin owner

 event Hello(uint indexed a, uint b, uint indexed c, uint d);
 
  function fun(uint a) public {
     emit Hello(a++, a, a, a);
  }
  
  function getContractBalance() public view returns(uint256) {
  return address(this).balance;
  }
  // contract balance
}

contract AccessControl {

  bytes32 constant public ADMIN = keccak256(abi.encodePacked("ADMIN"));
  // 0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42
  
  bytes32 constant public USER = keccak256(abi.encodePacked("USER"));
  // 0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42
}
// c > a > b > d
