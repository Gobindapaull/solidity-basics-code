// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Function {
    // state variable
    uint public a;

    function viewFun() public view returns (uint) {
        return a + 1;
    }

    function viewFunc(uint x) public view returns (uint) {
        return a + x;
    }

    function pureFun() public pure returns (uint) {
        return 191;
    }

    function pureFunc(uint x, uint y) public pure returns (uint) {
        return y + x;
    }
}
