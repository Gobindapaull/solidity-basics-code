// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Balance {
    // Contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // User balance
    function userBalance(address _user) public view returns (uint256) {
        return _user.balance;
    }

    receive() external payable {}
}
