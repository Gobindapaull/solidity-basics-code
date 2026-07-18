// SPDX-License-Identifier: MIT
pragma solidity ^0.8.36;

contract Escrow {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function addReceiver(address payable _to) public onlyOwner {
        escrowBalance(_to);
    }

    function escrowBalance(address payable _to) private {
        require(_to != address(0), "Invalid address");
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance");
        (bool success, ) = _to.call{value: balance}("");
        require(success, "Transfer failed");
    }

    receive() external payable {}
}
