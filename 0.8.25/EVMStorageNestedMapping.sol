// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract EVMStorageNestedMapping {
    mapping(address => mapping(address => uint256)) public map;

    address public constant ADDR_1 = address(1);
    address public constant ADDR_2 = address(2);
    address public constant ADDR_3 = address(3);

    constructor() {
        map[ADDR_1][ADDR_2] = 11;
        map[ADDR_2][ADDR_3] = 22;
        map[ADDR_3][ADDR_1] = 33;
    }

    function test_nested_mapping(address key0, address key1) public view returns (uint256 v) {
        bytes32 s0 = keccak256(abi.encode(key0, uint256(0)));
        bytes32 s1 = keccak256(abi.encode(key1, s0));

        assembly {
            v := sload(s1)
        }
    }
}
