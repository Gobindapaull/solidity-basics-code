// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract ErrorHandling {
    function divide(uint256 a, uint256 b) public pure returns (uint256) {
        // require(b != 0, "> zero");
        // assert(b != 0);
        if (b == 0) {
            revert("B should not be zero");
        }
        return a / b;
    }
}
