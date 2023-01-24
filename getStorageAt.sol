// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Storage {
    uint public BNB;
    uint public ETH;
    uint public MATIC;
    address public owner;
    mapping(address => uint) public balance;

    constructor(uint _bnbId, uint _ethId, uint _maticId) {
        BNB = _bnbId;
        ETH = _ethId;
        MATIC = _maticId;
        owner = msg.sender;
        balance[msg.sender] = 1234;
    }
}

// web3.eth.getStorageAt('0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47',0)
