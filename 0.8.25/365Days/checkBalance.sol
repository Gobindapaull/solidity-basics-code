// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Broke {
    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }

    function checkBalance() public view returns (bool) {
        require(address(msg.sender).balance > 5 ether, "Insufficient balance");
        return true;
    }
}
