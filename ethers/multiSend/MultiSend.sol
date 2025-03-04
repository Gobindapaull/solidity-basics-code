// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MultiSend {
    function multisend(address[] calldata recipients, uint256[] calldata amounts) public payable {
        require(recipients.length == amounts.length, "Array length mismatch");

        for (uint256 i = 0; i < recipients.length; i++) {
            payable(recipients[i]).transfer(amounts[i]);
        }
    }
}

// https://testnet.bscscan.com/address/0xbbf4C8D4E6a7AEB4Ee415CeC614477D6751c939E
