// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Owner {
    address public owner = msg.sender;

    function changeOwner(address newOwner) public {
        require(msg.sender == owner, "not owner");
        owner = newOwner;
    }
}
