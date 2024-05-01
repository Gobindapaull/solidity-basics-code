// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract EVMStorageMapping {
    mapping(address => uint256) public map;

    address public constant addr_1 = address(1); // 0x0000000000000000000000000000000000000001
    address public constant addr_2 = address(2); // 0x0000000000000000000000000000000000000002
    address public constant addr_3 = address(3); // 0x0000000000000000000000000000000000000003

    constructor() {
        map[addr_1] = 111;
        map[addr_2] = 222;
        map[addr_3] = 333;
    }

    function test_mapping(address key) public view returns (uint256 v) {
        bytes32 slot_v = keccak256(abi.encode(key, uint256(0)));
        assembly {
            v := sload(slot_v)
        }
    }
}
