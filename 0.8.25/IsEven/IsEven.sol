// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract IsEven {
    function isEven(uint256 number) public pure returns (bool) {
        return (number & 1) == 0; // bitwise logic
        // Then binary of any even number ends in 0, so number & 1 will be 0.
    }
}
