// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract SoliditySmartContract {
    uint256 public maxUint = 2 ** 256 -1; // 115792089237316195423570985008687907853269984665640564039457584007913129639935
    uint256 public blocktimestamp = block.timestamp; // 1741897110

    string public data1 = "pairCreated"; // pairCreated
    bytes32 public data2 = "pairCreated"; // 0x7061697243726561746564000000000000000000000000000000000000000000
    bytes4 public data3 = bytes4(keccak256("PairCreated(address,address,address,uint256)")); // first 4 bytes // 0x0d3648bd


    address private owner;

    uint256[] public numbers;

    constructor() {
        owner = msg.sender;
        for (uint256 i = 0; i < 10; i++) {
            numbers.push(5);
        }
    }

    function setOwner(address _newOwner) public {
        owner = _newOwner;
    }

    function Data() public pure returns (uint256) {
        uint256 data = 5;
        for (uint256 i = 0; i < 10; i++) {
            data *= 2;
        }
        return data; // 5120
    }

    function encodePackedString() public pure returns(string memory) {
        string memory d1 = "Hello\n";
        string memory d2 = "World";
        string memory result = string(abi.encodePacked(d1, d2)); 
        return result; // Hello World
    }
}
