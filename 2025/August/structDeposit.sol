// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Staking {
    uint256 public _18_Months = 18 * 30 days; // 46656000 // 18 * 30 * 24 * 3600 
    uint256 public base = 1e18; // 1000000000000000000


    struct Deposit {
        uint256 amount;
        uint256 unlockAt;
        uint256 unlockPeriod;
        uint256 index;
        uint256 withdrawAt;
    }
}
