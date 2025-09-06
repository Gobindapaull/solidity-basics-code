// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

uint256 constant DEDUCTED_DIGITS = 10_000_000;

library Types64 {
    function expand(uint64 value) internal pure returns(uint256) {
        return value * DEDUCTED_DIGITS;
    }
}

// expand() = uint64 → uint256

contract Expand {
    uint64 original = 42;
    uint256 public expanded = Types64.expand(original); // 420000000
}
