
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract ERC20 {
    address public manager;
    address payable[] public players;
    address payable winner;
    uint public num;

    constructor() {
        manager = msg.sender;
    }

    function participate() public payable {
        require(msg.value == 1 ether, "Please pay 1 ether to participate");
        players.push(payable(msg.sender));
    }

    function getContractBalance() public view returns (uint256) {
        require(msg.sender == manager, "only manager can view it");
        return address(this).balance;
    }

    function random() public view returns (uint) {
       return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players.length)));
    }
}
