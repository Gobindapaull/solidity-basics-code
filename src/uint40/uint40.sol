// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

contract Test {
    uint public a = type(uint40).max; // 1099511627775
    uint public b = uint40(block.timestamp);
}
