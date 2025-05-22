// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract IterableMapping {
    mapping(address => uint256) public userValue;
    address[] public users;
    mapping(address => bool) public hasAdded;

    function addOrUpdate(uint256 value) public {
        userValue[msg.sender] = value;

        if(!hasAdded[msg.sender]) {
            users.push(msg.sender);
            hasAdded[msg.sender] = true;
        }
    }

    function getUserCount() public view returns (uint256) {
        return users.length;
    }

    function getUserAtIndex(uint256 index) public view returns (address) {
        require(index < users.length, "Index out of bounds");
        return users[index];
    }

    function getUserAndValue(uint256 index) public view returns (address, uint256) {
        require(index < users.length, "Index out of bounds");
        address user = users[index];
        return (user, userValue[user]);
    }

    function getAll() public view returns (address[] memory, uint256[] memory) {
        uint256 len = users.length;
        address[] memory addresses = new address[](len);
        uint256[] memory values = new uint256[](len);

        for (uint256 i = 0; i < len; i++) {
            address user = users[i];
            addresses[i] = user;
            values[i] = userValue[user];
        }
        return (addresses, values);
    }
}
