// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract TEST {
    function hash(string memory _string) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_string));
    }
}
