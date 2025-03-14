// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract YulStorage {
    uint256 public value;

    function setValue(uint256 _value) public {
        assembly {
            sstore(0, _value)
        }
    }

    function getValue() public view returns (uint256 _value) {
        assembly {
            _value := sload(0) // Load value from storage slot 0
        }
    }
}
