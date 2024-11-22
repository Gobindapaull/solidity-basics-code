// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract CalculateSum {
    uint256[] public nums = [1, 2, 3, 4, 5, 6];

    function calculateSum(uint256[] memory _nums) public pure returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < _nums.length; i++) {
            sum = sum + _nums[i];
        }
        return sum;
    }
}
