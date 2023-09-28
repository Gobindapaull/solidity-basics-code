// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//   ____   ___  _     ___ ____ ___ _______   __
//  / ___| / _ \| |   |_ _|  _ \_ _|_   _\ \ / /
//  \___ \| | | | |    | || | | | |  | |  \ V / 
//   ___) | |_| | |___ | || |_| | |  | |   | |  
//  |____/ \___/|_____|___|____/___| |_|   |_|  

// Telegram: @autoboyt

contract VulnerableToken {
    mapping(address => uint256 ) public balances;
    
    uint256 public totalSupply = 10_000_000;
    address public dev = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;

    constructor() {
        balances[msg.sender] = totalSupply / 4;
        balances[dev] = totalSupply / 4;
        balances[address(this)] = totalSupply / 4;
        balances[0x0000000000000000000000000000000000000000] = totalSupply / 4;
    }
}
