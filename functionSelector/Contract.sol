// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Contract {
    address public owner = msg.sender;
    uint256 public amount = 1234;

    function addData(address _address, uint256 _amount) public returns (bool) {
        owner = _address;
        amount = _amount;
        return true;
    }
}
