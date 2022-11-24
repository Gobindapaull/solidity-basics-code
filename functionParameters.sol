// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Solidity {
    string public name = "crypto";
    bool public buy = true;

    function changeMind(string memory _name, bool _buy) public {
        name = _name;
        buy = _buy;
    }

    function callFunction1() public{
        changeMind("BNB", false);
    }

    function callFunction2() public {
        changeMind({
            _name: "ETH",
            _buy: true
        });
    }
