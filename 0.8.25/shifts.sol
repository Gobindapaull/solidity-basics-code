// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SmartContract {
    bool public x;
    bool public y = true;

    int256 public z = ~int256(0);
    // -1

    int public p = int256(-1);
    // -1

    uint public a = 2;
    uint public b = 3;

    uint public ab = a << b;
    // a * 2 ** b = 2 * 2 ** 3 = 2 * 8 = 16

    uint public c = 10;
    uint public d = 2;

    uint public cd = c >> d;
    // c / 2 ** d = 10 / 2 ** 2 = 10 / 4 = 2

}
