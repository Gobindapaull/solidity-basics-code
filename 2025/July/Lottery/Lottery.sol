// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value == 0.01 ether, "Send exactly 0.01 ETH");
        players.push(msg.sender);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, players)));
    }

    function pickWinner() public {
        require(msg.sender == manager, "Manager can pick winner");
        require(players.length > 0, "No players in the lottery");
        uint256 index = random() % players.length;
        address winner = players[index];
        payable(winner).transfer(address(this).balance);
        delete players;
    }
}
