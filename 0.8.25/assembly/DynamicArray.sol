// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DynamicArray {
    function test_read()
        public
        pure
        returns (
            bytes32 p,
            uint256 len,
            uint256 a0,
            uint256 a1,
            uint256 a2
        )
    {
        uint256[] memory arr = new uint256[](5);
        arr[0] = uint256(11);
        arr[1] = uint256(22);
        arr[2] = uint256(33);
        arr[3] = uint256(44);
        arr[4] = uint256(55);

        assembly {
            p := arr
            len := mload(arr)
            a0 := mload(add(arr, 0x20))
            a1 := mload(add(arr, 0x40))
            a2 := mload(add(arr, 0x60))
        }
    }

    function test_write() public pure returns (bytes32 p, uint256[] memory) {
        uint256[] memory arr = new uint256[](0);
        assembly {
            p := arr
            mstore(arr, 3)
            mstore(add(arr, 0x20), 11)
            mstore(add(arr, 0x40), 22)
            mstore(add(arr, 0x60), 33)
            mstore(0x40, add(arr, 0x80))
        }

        return (p, arr);
    }
}
