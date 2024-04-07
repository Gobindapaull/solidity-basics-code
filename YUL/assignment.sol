// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Yul {
    function test_yul() public pure returns (uint256) {
        uint256 s;
        assembly {
            s := 2
        }
        return s;
    }
}
