// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract SimpleContract {
    
    uint public favouriteNumber;

    function store(uint _favouriteNumber) external {
        favouriteNumber = _favouriteNumber;
    }
}
