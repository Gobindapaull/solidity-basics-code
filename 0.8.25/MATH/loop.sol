// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract LoopAndConditions {
    function check(uint256 _price) public pure returns(string memory) {
        if (_price < 49) {
            return "Buy tokens";
        } else if (_price == 49) {
            return "Wait for opportunity";
        } else if (_price > 49) {
            return "sell tokens";
        } else {
            return "don't do anything";
        }
    }
}
