// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

contract Greeter {
    string public greeting;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }
}
