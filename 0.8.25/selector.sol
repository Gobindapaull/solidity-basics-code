// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

library Lib {
    function fun1(uint256) external {}
}

contract Cnt {
    function fun1Call() public pure returns (bytes4) {
        return Lib.fun1.selector; // 0xacd9fd65
    }
}
