// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EVMStorage {
    // slot 0
    uint256 public s0 = 1;
    uint256 public constant x = 123;
    address public immutable owner;
    // slot 1
    uint256 public s1 = 2;

    constructor() {
        owner = msg.sender;
    }

    function get_slots() public view returns (uint256 v0, uint256 v1) {
        assembly {
            v0 := sload(0)
            v1 := sload(1)
        }
    }
}

