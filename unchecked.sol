// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Test {

    function testUnchecked() public pure returns(uint) {
        uint x;
        unchecked{
            x--;
        }
        return x/1e18;
    }
}
