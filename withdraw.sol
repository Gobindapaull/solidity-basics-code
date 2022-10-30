// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Test {

    address public owner = payable(msg.sender);

    function withdraw() public {
        if(msg.sender != owner) {
            revert("not owner");
        }
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
