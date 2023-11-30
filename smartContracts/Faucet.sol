/**
 *Submitted for verification at Etherscan.io on 2023-11-30
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Faucet {
    receive() external payable { }

    function withdraw(uint256 withdrawAmount) public {
        require(withdrawAmount <= 1000000000000000);
        payable(msg.sender).transfer(withdrawAmount);
    }
}
