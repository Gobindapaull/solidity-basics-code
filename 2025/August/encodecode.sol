// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Storage {
    function encodeData(string memory text, uint256 number) public pure returns (bytes memory b) {
        return b = abi.encode(text, number);
    }

    function decodeData(bytes memory _data) public pure returns (string memory x, uint256 y) {
        (x, y) = abi.decode(_data, (string, uint256));
    }
}
