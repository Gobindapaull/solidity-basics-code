// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleStorage {
    uint storedData;

    function set(uint _x) public {
        storedData = _x;
    }

    function get() public view returns (uint) {
            return storedData;
    }
}
