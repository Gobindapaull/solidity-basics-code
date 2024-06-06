// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract ArrayPush {
    address[] public users;

    function participate() external {
        users.push(msg.sender);
    }
}
