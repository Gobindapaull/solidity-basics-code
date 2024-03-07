// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Assembly {
    function at(address addr) public view returns (bytes memory code) {
        assembly {
            let size := extcodesize(addr)
            code := mload(0x40)
            mstore(0x40, add(code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
            mstore(code, size)
            extcodecopy(addr, add(code, 0x20), 0, size)
        }
    }
}
