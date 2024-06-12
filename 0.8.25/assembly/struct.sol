// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Struct_EVM {
    struct Point {
        uint256 x;
        uint32 y;
        uint32 z;
    }

    function test_read() public pure returns (uint256 x, uint256 y, uint256 z) {
        Point memory p = Point(1, 2, 3);
        assembly {
            x := mload(0x80)
            y := mload(0xa0)
            z := mload(0xc0)
        }
    }

    function test_write() public pure returns (bytes32 free_memory_ptr, uint256 x, uint256 y, uint256 z) {
        Point memory p;
        assembly {
            mstore(0x80, 11)
            mstore(0xa0, 22)
            mstore(0xc0, 33)
            free_memory_ptr := mload(0x40)
        }

        x = p.x;
        y = p.y;
        z = p.z;
    }
}
