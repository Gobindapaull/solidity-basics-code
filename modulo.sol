// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Docs {
    int public x = int256(5) % int256(2); // 1
    int public y = int256(5) % int256(-2); // 1
    int public z = int256(-5) % int256(2); // -1
    int public q = int256(-5) % int256(-2); // -1
    
    uint public exp = 0 ** 0;
    
    address public owner = payable(0);
    
    bytes32 b = 0x111122223333444455556666777788889999AAAABBBBCCCCDDDDEEEEFFFFCCCC;
    address public addr = address(uint160(uint256(b)));
}
