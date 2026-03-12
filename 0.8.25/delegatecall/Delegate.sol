// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Delegate {
    uint256 public total;

    function add(uint256 num1, uint256 num2) public {
        total = num1 + num2;
    }
}
