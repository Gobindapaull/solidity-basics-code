// SPDX-License-Identifier: MIT
pragma solidity ^0.8.31;

contract TestContract {
    function name() public pure  returns (string memory) {
        assembly {
            mstore(0x20, 0x20)
            mstore(0x47, 0x07536561706f7274) // Seaport
            return(0x20, 0x60)
        }
    }
}
