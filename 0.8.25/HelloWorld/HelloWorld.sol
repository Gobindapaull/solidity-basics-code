// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HelloWorld {
    string public name = "Hello World";
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function setName(string memory _newName) public {
        require(msg.sender == owner, "Not owner");
        name = _newName;
    }
}
