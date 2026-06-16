// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract String {
    string public name = "Token name";

    function setName(string memory _name) public {
        name = _name;
    }

    // String length
    function getLength(string memory _text) public pure returns (uint256) {
        return bytes(_text).length; // 19
    }

    // Convert string to bytes
    function stringToBytes(string memory _text) public pure returns (bytes memory) {
        return bytes(_text); // 0x426c6f636b636861696e20616e642077656233
    }

    // Concatenate string
    function join() public pure returns (string memory) {
        return string.concat("Hello ", "Solidity");
    }
}
