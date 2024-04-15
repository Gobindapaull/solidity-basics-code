// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EVMStorageSlot {
    struct SingleSlot {
        uint128 x;
        uint64 y;
        uint64 z;
    }

    struct MultipleSlots {
        uint256 a;
        uint256 b;
        uint256 c;
    }

    SingleSlot public singleSlot = SingleSlot({x : 1, y: 2, z : 3});
    MultipleSlots public multipleSlot = MultipleSlots({a : 11, b: 22, c : 33});

    function singleSlotStruct() public view returns (uint128 x, uint64 y, uint64 z) {
        assembly {
            let s := sload(0)
            x := s
            y := shr(128, s)
            z := shr(192, s)
        }
    }

     function multipleSlotsStruct() public view returns (uint256 a, uint256 b, uint256 c) {
        assembly {
            a := sload(1)
            b := sload(2)
            c := sload(3)
        }
    }
}
