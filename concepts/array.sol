// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract SmartContract {
    address[] public users = [0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5, 0xcBfa884044546d5569E2abFf3fB429301b61562A];

    function usersArray() public view returns (uint, address, bool) {
        return (
            users.length,
            users[1],
            true
        );
    }
}
