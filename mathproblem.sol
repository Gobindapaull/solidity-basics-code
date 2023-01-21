// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
contract Math {
    function fun(uint a, uint b) public pure returns (uint, uint) {
        return (
                ((7/11 + 3/13) * 22 + 1 ) * 39,// 783
                ((a/11 + b/13) * 22 + 1) * 39 // 39
            );
    }
}
