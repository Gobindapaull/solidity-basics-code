// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Keccak256 {

    function Keccak256Fun() public pure returns (bytes32) {
        return keccak256("SOLIDITY"); // 0x6de1c330c658139e756b237a5741f422c7e56f5f05f25fc83e2d3289e1356537
    }

    function sha256Fun() public pure returns (bytes32) {
        return sha256("SOLIDITY"); // 0xe02e2fed1ccfb1fb088ce50d808a160eb355bdff5e65e266a065b332f4eb2f97
    }
    
}
