// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Payable {
    // payable is used to allow a function or address to receive Ether(ETH)

    address payable public owner = payable(msg.sender);

    function deposit() public payable {

    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public {
        require(msg.sender == owner, "Not owner");
        uint256 amount = address(this).balance;
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Transfer failed");
    }

}
