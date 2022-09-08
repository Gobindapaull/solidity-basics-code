// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;


contract Synthetix {
    uint public _totalSupply;
    mapping(address => uint) public _balances;

    function stake(uint amount) external {
        require(amount > 0, "Cannot stake 0");
        _totalSupply += amount;
        _balances[msg.sender] += amount;
    }
}
