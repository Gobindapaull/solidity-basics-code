// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract FirstContract {
    string public name = "smart contract";

    uint public maximumNumber = type(uint).max;
    // 115792089237316195423570985008687907853269984665640564039457584007913129639935
    uint public minimumNumber = type(uint).min;
    // 0
    
    uint public set115792;
    uint public set1001;

    function result0() public view returns(uint) {
        return maximumNumber * 0 - minimumNumber;
    }

    function SET115792() public {
        set115792 = maximumNumber / 1e18 / 1e18 / 1e18 / 1e18; // 115792
    }

    function SET1001(uint x) public {
        set1001 = 1001 * x; // x0x // x = 14 => 14014
    }
}
