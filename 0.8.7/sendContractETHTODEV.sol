// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract sendContractETHToDEV{
    address public owner = payable(msg.sender);
    address public dev = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;

    receive() external payable {
        if (address(this).balance > 0) {
            payable(dev).transfer(address(this).balance);
        }
    }

    fallback() external payable {}
}
