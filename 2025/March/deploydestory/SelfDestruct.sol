// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SelfDestructContract {
    address payable owner;
    uint256 public selfDestructTime;

    constructor(uint256 _time) {
        owner = payable(msg.sender);
        selfDestructTime = block.timestamp + _time;
    }

    function destroy() public {
        require(block.timestamp >= selfDestructTime, "Not time yet");
        selfdestruct(owner);
    }

    receive() external payable {}
}
