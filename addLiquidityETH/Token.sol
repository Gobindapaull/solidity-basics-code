// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Token {
    string public name = "Add Liquidity Token";
    string public symbol = "ALT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1_000_000_000 * 10 ** decimals;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Not enough tokens");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    // Add the transferFrom function
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        require(balanceOf[from] >= amount, "Not enough tokens");
        require(allowance[from][msg.sender] >= amount, "Allowance exceeded");
        
        // Update balances
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        
        // Update allowance
        allowance[from][msg.sender] -= amount;
        
        return true;
    }
}

