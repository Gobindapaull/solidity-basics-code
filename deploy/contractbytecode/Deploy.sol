// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Deploy {
    function deploy(bytes memory bytecode) public returns (address addr) {
        assembly {
            addr := create(0, add(bytecode, 0x20), mload(bytecode))
        }
        require(addr != address(0), "deploy failed");
    }
}
