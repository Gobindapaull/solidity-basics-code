// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ContractA {
    uint public x;

    function externalFunction() external {
        x++;
    }

    function publicFunction() public {
        x++;
    }
}
