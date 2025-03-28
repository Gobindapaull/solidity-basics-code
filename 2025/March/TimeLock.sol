
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TimeLock {
    address payable public beneficiary;
    uint256 public releaseTime;

    constructor(address payable _beneficiary) {
        beneficiary = _beneficiary;
        releaseTime = block.timestamp + 25 seconds;
    }

    function deposit() public payable {}

    function withdraw() public {
        require(block.timestamp >= releaseTime, "Funds are locked");
        require(address(this).balance > 0, "No funds available");
        beneficiary.transfer(address(this).balance);
    }
}
