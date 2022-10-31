// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Escrow {
    address public buyer;
    address public seller;

    modifier buyerOnly {
        require(msg.sender == buyer, "not buyer");
        _;
    }
    enum State {
        waitingPayment,
        waitingDelivery,
        complete
    }
    State public currentState;

    constructor(address _buyer, address _seller) {
        buyer = _buyer;
        seller = _seller;
    }
    function confirmPayment() public buyerOnly {  
        require(currentState == State.waitingDelivery, "not deliver");
        currentState = State.complete;
    }
    function confirmDelivery() public buyerOnly {
        require(currentState == State.waitingPayment, "not done payment");
        payable(seller).transfer(address(this).balance);
        currentState = State.complete;
    }
}
