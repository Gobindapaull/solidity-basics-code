// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PEPE {

    address public owner = msg.sender;

    bool public tradingOpen; // false
    bool public swapEnabled; // false
    uint256 public firstBlock; // 0

    function openTrading() external {
        require(msg.sender == owner, "not owner");
        swapEnabled = true;
        tradingOpen = true;
        firstBlock = block.number;

    }

    function renounceOwnership() public {
        require(msg.sender == owner, "not owner");
        owner = address(0);
    }

    function transferOwnership(address newOwner) public {
        require(msg.sender == owner, "not owner");
        owner = newOwner;
    }
}
