// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract GlobalVariable {

    function globalVars() external view returns(address, uint, uint) {
        address owner = msg.sender;
        uint timestamp = block.timestamp;
        uint blockNumber = block.number;
        return (owner, timestamp, blockNumber);
    }
}
