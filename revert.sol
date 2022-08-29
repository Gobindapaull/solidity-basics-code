// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract ContractName {
    uint private num;
    error UnsafeDecrement();

    constructor(uint _num) {
        num = _num;
    }

    function increment() public {
        num += 1;
    }

    function decrement(uint _num1) public {
        if (num - _num1 > 0) {
            num -= _num1;
        } else {
            revert UnsafeDecrement();
        }

    }

    function getNum() public view returns (uint) {
        return num;
    }
}
