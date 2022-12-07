// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Docs {
    int public x = int256(5) % int256(2); // 1
    int public y = int256(5) % int256(-2); // 1
    int public z = int256(-5) % int256(2); // -1
    int public q = int256(-5) % int256(-2); // -1
    
    uint public exp = 0 ** 0;
}
