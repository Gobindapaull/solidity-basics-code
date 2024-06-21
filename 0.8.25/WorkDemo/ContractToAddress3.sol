// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Sent {

    address  receiver1 = payable(0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD);
    address  receiver2 = payable(0xb700DaeA990aefBeDB36f109F9989Ab87A86601d);
    address  receiver3 = payable(0x574ABc257719166C5F5BE93574e566B501a872c7);
    
    receive() external payable {
        uint256 amount = msg.value;
        payable(receiver1).transfer(amount / 3);
        payable(receiver2).transfer(amount / 3);
        payable(receiver3).transfer(amount / 3);
    }

    function balance(address _owner) public view returns (uint256) {
        return _owner.balance;
    } 
}
