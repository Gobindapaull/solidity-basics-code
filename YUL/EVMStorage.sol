// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Yul {
    function test_yul() public pure returns (uint256) {
        uint256 s;
        assembly {
            s := 2
        }
        return s;
    }

    function test_yul_types() public pure returns (bool x, uint256 y, bytes32 z) {
        assembly {
            x := 1
            y := 0xababab
            z := "Hello Yul"
        }
    }
}

contract EVMStorageSingleSlot {
    // slot 0
    uint256 public x;
    // slot 1
    uint256 public y;
    // slot 2
    bytes32 public z;

    function test_sstore() public {
        assembly {
            sstore(0, 111)
            sstore(1, 123)
            sstore(2, 0xababab)
        }
    }

    function test_sstore_again() public {
        assembly {
            sstore(x.slot, 1111)
            sstore(y.slot, 1234)
            sstore(z.slot, 0xabababab)
        }
    }

    function test_sload() public view returns (uint256 _x, uint256 _y, bytes32 _z) {
        assembly {
            _x := sload(0)
            _y := sload(1)
            _z := sload(2)
        }
    }

        function test_sload_again() public view returns (uint256 _x, uint256 _y, bytes32 _z) {
        assembly {
            _x := sload(x.slot)
            _y := sload(y.slot)
            _z := sload(z.slot)
        }
    }
}
