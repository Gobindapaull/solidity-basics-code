/**
 *Submitted for verification at mumbai.polygonscan.com on 2023-12-04
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface Oracle {
    function latestAnswer() external view returns (int256);
}

contract ExchangeRate {
    address oracleAddr = 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada;

    function maticPrice(int cents) public view returns (int) {
        int currentFiatPrice = Oracle(oracleAddr).latestAnswer() * 1e10;
        int fiatPrice = cents * 1e16;
        int matic = (fiatPrice * 1e18) / currentFiatPrice;
        return matic;
    } 
}

// https://mumbai.polygonscan.com/address/0x9a043a67ecb3c6bab43b30147b25fa54fc90f21b#code
