// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract ViewPure {
    uint256 public totalSupply = 10000000;

    // View Reads a state variable but doesn't modify it.
    function supply() public view returns (uint256) {
        return totalSupply;
    }

    // Because it only performs a calculation.
    function calculateTax(uint256 amount) public pure returns(uint256) {
        return amount * 5 / 100;
    }
    
    // Changes state? → neither (view nor pure)
}
