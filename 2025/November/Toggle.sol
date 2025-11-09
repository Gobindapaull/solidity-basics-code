// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Practice {
    bool public isOn; // false
    uint256 public constant price = 0.5 ether; // 500000000000000000

    function toggle() public {
        isOn = !isOn;
    }
}
