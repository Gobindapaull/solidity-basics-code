// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract SimpleContract {

    uint private favouriteNumber;

    function store(uint _favouriteNumber) external {
        favouriteNumber = _favouriteNumber;
    }

    function retrieve() external view returns(uint) {
        return favouriteNumber;
    }
}
