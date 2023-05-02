// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Pure {

    uint private a = 10;

    // it doesn't access any state variable or read data from any external contract
    function add(uint x, uint y) public pure returns (uint) {
        return x + y;
    }
    function mul() public view returns (uint) {
        return a; // view state variable
    }

    function getBalance() external view returns(uint) {
        return address(this).balance; // always view not pure
    }
}
