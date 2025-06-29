// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract BlockTimestamp {
    function spin() public payable {
        require(msg.value >= 0.0001 ether, "Must be more than 1 ether");
        if (block.timestamp % 7 == 0) {
            (bool sent, ) = msg.sender.call{value: address(this).balance}("");
            require(sent, "Failed to sent ether");
        }
    }

    receive() external payable { }
}
