// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract EventLogger {
    event MessageLogged(address indexed sender, string message, uint256 timestamp);

    function logMessage(string calldata _message) external {
        emit MessageLogged(msg.sender, _message, block.timestamp);
    }
}
