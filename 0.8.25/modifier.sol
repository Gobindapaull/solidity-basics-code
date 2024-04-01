// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract New {
    bool active = true;
    modifier mod() {
        _;
        active = false;
        _;
    }
    function foo() external mod() returns (uint result) {
        if (!active) {
            result = 123;
        }
    }
}
