// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ESCROW {
    address public buyer;
    address public seller;
    address public agent;

    constructor(address _buyer, address _seller, address _agent) {
        buyer = _buyer;
        seller = _seller;
        agent = _agent;
    }

    // to receive ether to the contract
    receive() payable external {}

    function paySeller() public {
        require(msg.sender == agent, "not agent");
        payable(seller).transfer(address(this).balance);
    }

    function refundBuyer() public {
        require(msg.sender == agent, "not agent");
        payable(buyer).transfer(address(this).balance);
    }

    function contractBalance() public view returns(uint) {
        return address(this).balance;
    }
}
