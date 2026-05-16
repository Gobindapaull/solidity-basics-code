// SPDX-License-Identifier: MIT
pragma solidity ^0.8.35;

contract AutoSend {
    address payable public receiver;

    constructor(address payable _receiver) {
        receiver = _receiver;
    }

    receive() external payable {
        (bool success, ) = receiver.call{value: msg.value}("");
        require(success, "Failed to send ETH");
    }
}
