// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract StructTest {
    struct User {
        string name;
        uint8 age;
    }

    User public user;

    function setUser(User memory _user) public {
        user = _user; // ["bob",12]
    } 
}
