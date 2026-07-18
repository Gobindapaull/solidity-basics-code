// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Escrow {
    address payable public buyer;
    address payable public seller;
    address payable public arbiter;
    address public Contract = address(this);
    uint public Balance = address(this).balance;

   function EscrowSetUp(address payable _seller, address payable _arbiter) public {
        buyer = payable(msg.sender);
        seller = _seller;
        arbiter = _arbiter;
    }
    function payOutToSeller() public {
        seller.transfer(payable(address(this)).balance);
    }
    function refundToBuyer() public {
        buyer.transfer(payable(address(this)).balance);
    }
}
