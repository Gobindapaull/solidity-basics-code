// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract AddMulMod {

    function addMod() public pure returns (uint) {
        return addmod(5, 6, 3); // (5 + 6) % 3 = 2
    }

    function mulMod() public pure returns (uint) {
        return mulmod(6, 7, 4); // (6 * 7) % 4 = 2
    }
}
