// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Address {
        function generateAddress() public view returns (address) {
        return address(uint160(uint256(keccak256(abi.encodePacked(
            blockhash(block.number - 1),
            block.coinbase,
            block.timestamp
        )))));
    }
}
