// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Version {
    function version() external pure returns (string memory) {
        assembly {
            mstore(0x40, 0)
            mstore(0x41, 0x0132)
            mstore(0x20, 0x20)
            return (0x20, 0x60)
        }
    } // "2"
}
