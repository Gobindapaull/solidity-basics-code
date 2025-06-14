// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract YULSmartContract {
    uint256[3] fixedSizeArray;
    uint256[] dynamicArray;
    uint8[] smallArray;

    constructor() {
        fixedSizeArray = [66, 77, 88];
        dynamicArray = [9, 999, 999999];
        smallArray = [3, 25, 255];
    }

    function getValueFixedArray(uint56 index) public view returns (uint56 value) {
        assembly {
            value := sload(add(fixedSizeArray.slot, index))
        }
    }

    function getDynamicArrayLength() public view returns (uint256 length) {
        assembly {
        length := sload(dynamicArray.slot)
        }
    }

    function getDynamicArrayValue(uint256 index) public view returns (uint256 value) {
        uint256 arraySlot;
        assembly {
            arraySlot := dynamicArray.slot
        }
        bytes32 dataStartSlot = keccak256(abi.encode(arraySlot));
        assembly {
            value := sload(add(dataStartSlot, index))
        }
    }

        function getSmallArrayValue(uint256 index) public view returns (bytes32 value) {
        uint256 arraySlot;
        assembly {
            arraySlot := smallArray.slot
        }
        bytes32 dataStartSlot = keccak256(abi.encode(arraySlot));
        assembly {
            value := sload(add(dataStartSlot, index))
        }
        // 0x0000000000000000000000000000000000000000000000000000000000ff1903
    }
}
