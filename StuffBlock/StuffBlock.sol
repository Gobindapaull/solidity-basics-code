// SPDX-License-Identifier: MIT
pragma solidity ^0.8.36;

contract StuffBlock {
    uint256[] public data;

    function stuffBlock(uint256 n) external {
        for (uint256 i = 0; i < n; i++) {
            data.push(i);
        }
    }
}
