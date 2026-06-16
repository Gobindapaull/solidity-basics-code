// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Mapping {
    // key-value data structure
    mapping(address => uint256) public balances;

    // Token ownership
    mapping(address => bool) public isWhitelisted;

    // Nested mapping
    mapping(address => mapping(address => uint256)) public _allowance; // Owner => spender => amount

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function addToWhitelist(address user) public {
        isWhitelisted[user] = true;
    }

    function approve(address owner, address spender, uint256 amount) public {
        _allowance[owner][spender] = amount;
    }
}
