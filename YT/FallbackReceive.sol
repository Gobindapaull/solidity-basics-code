// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Fallback {

    event Log(string name, address sender, uint value, bytes data);

    fallback() external payable {
        emit Log("Fallback function", msg.sender, msg.value, msg.data);
    }

    receive() external payable {
        emit Log("Receive function", msg.sender, msg.value, "");
        // "msg.data" cannot be used inside of "receive" function
    }

}
