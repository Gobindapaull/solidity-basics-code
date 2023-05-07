// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Advance {
   function A() public pure virtual returns (string memory) {
       return "A";
   }
    function B() public pure returns (string memory) {
       return "B";
   }
}

contract C is Advance {
   function A() public pure override returns (string memory) {
       return "A change to B";
   }
}

contract D is Advance {

}
