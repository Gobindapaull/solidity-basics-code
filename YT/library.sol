// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

library Math {
    function max(uint x, uint y) external pure returns (uint) {
        return x > y ? x : y;
    }
}

contract Max {
    function maxFun(uint _x, uint _y) external pure returns (uint) {
        return Math.max(_x, _y);
    }
}
