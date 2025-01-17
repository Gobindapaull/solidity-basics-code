// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Mapping {
    mapping(address => uint) public balances;

    uint public eth = 10 ** 18 wei;

    function balance(address _address) public view returns (uint) {
        return balances[_address];
    }
}
