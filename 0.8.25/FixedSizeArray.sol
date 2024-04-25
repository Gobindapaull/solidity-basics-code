// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EVMStorageFixedArray {
    // slot of element = slot where array is decleared + index of array element

    // slot 0, slot 1, slot 2
    uint256[3] private arr_0 = [1, 2, 3];

    // slot 3, slot 4, slot 5
    uint256[3] private arr_1 = [4, 5, 6];

    // slot 6, slot 6, slot 7, slot 7, slot 8
    uint128[5] private arr_2 = [7, 8, 9, 10, 11];

    function test_arr_0(uint256 i) public view returns (uint256 v) {
        assembly {
            v := sload(i)
        }
    }

    function test_arr_1(uint256 i) public view returns (uint256 v) {
        assembly {
            v := sload(add(3, i))
        }
    }

    function test_arr_2(uint128 i) public view returns (uint128 v) {
        assembly {
            let b32 := sload(add(6, div(i, 2)))
            switch mod(i, 2)
            case 1 { v := shr(128, b32)}
            default { v := b32}
        }
    }
}
