// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EVMStorage {
    // slot 0 (packed right to left)
    bytes4 public b4 = 0xabababab;
    bytes2 public b2 = 0xabcd;

    function get() public view returns (bytes32 b32) {
        assembly {
            b32 := sload(0)
        }
    }
}

contract BitMasking {
    function test_mask() public pure returns (bytes32 mask) {
        assembly {
            mask := sub(shl(16, 1), 1)
            // 0x000000000000000000000000000000000000000000000000000000000000ffff
        }
    }

    function test_shift_mask() public pure returns (bytes32 mask) {
        assembly {
            mask := shl(32, sub(shl(16, 1), 1))
            // 0x0000000000000000000000000000000000000000000000000000ffff00000000
        }
    }

    function test_not_mask() public pure returns (bytes32 mask) {
        assembly {
            mask := not(shl(32, sub(shl(16, 1), 1)))
            // 0xffffffffffffffffffffffffffffffffffffffffffffffffffff0000ffffffff
        }
    }
}
