// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


contract MemRevert {

    function test_revert_with_error_message() public pure{
        assembly {
            let p := mload(0x40)
            mstore(p, shl(224, 0x08c379a0))
            mstore(add(p, 0x04), 0x20)
            mstore(add(p, 0x24), 5)
            mstore(add(p, 0x44), "ERROR")
            revert(p, 0x64)
        }
    }
}
