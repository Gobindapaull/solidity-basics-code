// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Sent {
    address  receiver = payable(0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD);
    
    receive() external payable {
        payable(receiver).transfer(msg.value);
    }
}
