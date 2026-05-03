// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Flashloan {
    uint256 public startTime = block.timestamp; // 1777824390

    function Wait1Hour() public view returns (string memory) {
        require(block.timestamp >= startTime + 1 hours, "Wait 1 hour");
        return "Now it works"; // 
    }
}
