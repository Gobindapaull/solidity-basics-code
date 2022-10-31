// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract NFT {
    address public minter;
    mapping(address => uint) public balances;
    event Sent(address from, address to, uint amount);

    constructor() {
        minter = msg.sender;
        // 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    }

    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        balances[receiver] += amount;
    }
    function send(address receiver, uint amount) public {
        balances[msg.sender] -= amount; // me
        balances[receiver] += amount; // receiver
        emit Sent(msg.sender, receiver, amount);
    }
}
