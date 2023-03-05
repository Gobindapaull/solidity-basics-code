// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract YUL {
    function numberType() public pure returns (uint256) {
        uint256 x;
        assembly {
            x := 88
        }
        return x;    
    }
}
