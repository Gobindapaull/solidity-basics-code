// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Test {

    address public owner = payable(msg.sender);
    error UnAuthorized(address caller);

    function withdraw() public {
        if(msg.sender != owner) {
            revert UnAuthorized(msg.sender);
        }
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
} 
