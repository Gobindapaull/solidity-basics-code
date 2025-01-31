// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Structs {
    struct User {
        string name;
        uint256 age;
        bool isRegistered;
    }

    uint256 public index;

    mapping(uint256 => User) public userInfo;

    function insert(string memory _name, uint256 _age) public {
        userInfo[index] = User(_name, _age, true);
        index++;
    }

    function modifyInfo(uint _id, string memory _name, uint _age) public {
        userInfo[_id].name = _name;
        userInfo[_id].age = _age;
    }
}
