// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Array {
    uint256[] public testArray;
    uint256[2] public testArray2;

    function addToArray() public {
        testArray.push(10);
        testArray.push(20);
    }

    function addToArray2() public {
        testArray2[0] = 10;
        testArray2[1] = 20;
    }
}
