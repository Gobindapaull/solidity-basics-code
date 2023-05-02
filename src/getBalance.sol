// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TestContract {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function deposit() external payable {}

    function getBalance() external view returns(uint) {
        return address(this).balance / 1e18; // balance in ether
    }
}
