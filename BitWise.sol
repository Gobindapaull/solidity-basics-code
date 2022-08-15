// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract BitWise {
    function and(uint x, uint y) external pure returns (uint) {
        return x & y;
        // x = 2; y = 3; return 2
    } 

    function or(uint x, uint y) external pure returns (uint) {
        return x | y;
        // x = 5; y = 3; return 7
    }

    function xor(uint x, uint y) external pure returns (uint) {
        return x ^ y;
        // x = 4; y = 7; return 3
    }

    function not(uint x) external pure returns (uint) {
        return x; // tilda left to x
    }

    function shiftLeft(uint x, uint bits) external pure returns (uint) {
        return x << bits;
        // x = 3; bits = 2; return 12
    }

    function shiftRight(uint x, uint bits) external pure returns (uint) {
        return x >> bits;
        // x = 3; bits = 2; return 0
    }

    function getLastNBitsUsingMod(uint x, uint n) external pure returns (uint) {
        return x % (1 << n);
    }
}
