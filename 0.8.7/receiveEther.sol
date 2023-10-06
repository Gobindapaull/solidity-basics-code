// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//   ____   ___  _     ___ ____ ___ _______   __
//  / ___| / _ \| |   |_ _|  _ \_ _|_   _\ \ / /
//  \___ \| | | | |    | || | | | |  | |  \ V / 
//   ___) | |_| | |___ | || |_| | |  | |   | |  
//  |____/ \___/|_____|___|____/___| |_|   |_|  

// Telegram: @autoboyt

contract smartContract {

    uint256 public totalSupply;

    constructor(uint256 _totalSupply) payable {
        totalSupply = _totalSupply;
    }
}
