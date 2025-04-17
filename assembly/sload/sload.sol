// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract Sload {
    address public owner = msg.sender;

    function getOwner() public view  returns (address addr, address addr2) {
        assembly {
            addr := sload(0)
            addr2 := sload(owner.slot)
        }
    }
}
