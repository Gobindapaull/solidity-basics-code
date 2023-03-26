// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Lottery {
    address payable[] public players;
    address payable public owner;
    address public winner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable{
        require(msg.sender != owner, "Owner can not participate");
        require(msg.value == 1 ether, "1 ether required to participate");
        players.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function random() public view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp,msg.sender)));
    }

    function transferAmount() public view returns(uint) {
        uint amount = getBalance() / 100 * 80;
        return amount;
    }

    function Winner() public {
        uint index = random() % players.length;
        winner = players[index];
        payable(winner).transfer(transferAmount());
        players = new address payable[](0);
    }

}
