// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GasUsage {
    function measure() external view returns (uint256, uint256) {
        uint256 start = gasleft();

        uint256 x = 0;
        for (uint256 i = 0; i < 100; i++) {
            x += i;
        }

        return (start, start - gasleft());
    }
}
