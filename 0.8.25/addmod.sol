// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract C {
    function preIn(uint8 a) public pure returns (uint8) {
        return ++a + a;
        // a = 5
        // 6 + 5 = 11
    }

    function g(uint8 a, uint8 b) public pure returns (uint8) {
        return ((++a + ++b) + (a + b)); 
        // a = 3 , b = 4
        // (4 + 5) + (3 + 4) = 9 + 7 = 16
    }

    function f() public pure returns (uint256 aMod, uint256 mMod) {
        uint256 x = 3;
        aMod = addmod(++x, ++x, x); // 0
        mMod = mulmod(++x, ++x, x); // 2
    }

    function p() public pure returns (uint256) {
        return (type(uint64).max - 0x80 - 32 ) / 32;
    }

    function q(uint a) public pure returns (uint r1, uint r2) {
        a = ~a;
        assembly {
            r1 := a
            // 115792089237316195423570985008687907853269984665640564039457584007913129639933

        }
        r2 = a;
        // 115792089237316195423570985008687907853269984665640564039457584007913129639933
    }
}
