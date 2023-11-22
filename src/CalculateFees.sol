// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract SmartContract {
    uint256 public fees;
    address public owner = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    uint256 public buyMarketingFee = 5;

    function CalculateFees(uint256 _amount) public {
        if ( msg.sender == owner) {
            fees = (_amount * buyMarketingFee) / 100;
        }
    }
}
