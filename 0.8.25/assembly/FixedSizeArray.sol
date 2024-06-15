// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FixedSizedArray {
    function test_read() public pure returns (uint256 a0, uint256 a1, uint256 a2) {
        uint32[3] memory arr = [uint32(1), uint32(2), uint32(3)];
        assembly {
            a0 := mload(0x80)
            a1 := mload(0xa0)
            a2 := mload(0xc0)
        }
    }

    function test_write() public pure returns (uint256 a0, uint256 a1, uint256 a2) {
        uint32[3] memory arr;
        assembly {
            mstore(0x80, 11)
            mstore(0xa0, 22)
            mstore(0xc0, 33)
        }
        a0 = arr[0];
        a1 = arr[1];
        a2 = arr[2];
    }
}
