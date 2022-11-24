// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Test {
    function sumOfCubes(uint256 x, uint256 y) external pure returns (uint256) {
        unchecked {
            uint256 x3 = x * x * x;
            uint256 y3 = y * y * y;
            return x3 + y3;
        }
    }
}
