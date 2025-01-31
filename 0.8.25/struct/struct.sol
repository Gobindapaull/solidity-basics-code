// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Structs {
    struct User {
        string name;
        uint256 age;
        bool isRegistered;
    }

    User public userInfo;

    function insert(string memory _name, uint256 _age) public {
        userInfo.name = _name;
        userInfo.age = _age;
        userInfo.isRegistered = true;
    }
}
