// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Revert {
    function revert_test() public pure {
        assembly {
            let p := mload(0x40)
            mstore(p, shl(224, 0x08c379a0))
            mstore(add(p, 0x04), 0x20)
            mstore(add(p, 0x24), 13)
            mstore(add(p, 0x44), "ERROR MESSAGE")
            revert(p, 0x64)
        }
    }
}
