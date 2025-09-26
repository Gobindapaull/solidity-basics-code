
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyNFT {
    address public owner;
    string public name;
    string public symbol;
    uint256 public totalSupply;

    bool public allFAssigned = false;
    uint256 public FRemainingToAssign = 0;

    mapping(uint256 => address) public FIndexToAddress;
    mapping(address => uint256) public balanceOf;

    struct Offer {
        bool isForSale;
        uint256 FIndex;
        address seller;
        uint256 minValue;
        address onlySellTo;
    }

    struct Bid {
        bool hasBid;
        uint256 FIndex;
        address bidder;
        uint256 value;
    }

    mapping(uint256 => Offer) public FOfferedForSale;
    mapping(uint256 => Bid) public FBids;
    mapping(address => uint256) public pendingWithdrawls;

    constructor() {
        owner = msg.sender;
        totalSupply = 10000;
        FRemainingToAssign = totalSupply;
        name = "FCrypto";
        symbol = "F";
    }

    function setInitialOwner(address to, uint256 FIndex) public {
        if (msg.sender != owner) revert();
        if (allFAssigned) revert();
        if (FIndex >= 10000) revert();
        if (FIndexToAddress[FIndex] != to) {
            if (FIndexToAddress[FIndex] != address(0)) {
                balanceOf[FIndexToAddress[FIndex]]--;
            } else {
                FRemainingToAssign--;
            }
            FIndexToAddress[FIndex] = to;
            balanceOf[to]++;
        }
    }

    function setInitialOwners(address[] memory addresses, uint256[] memory indices) public {
        if (msg.sender != owner) revert();
        uint256 n = addresses.length;
        // ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2","0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"]
        // [1,2]
        for (uint256 i = 0; i < n; i++) {
            setInitialOwner(addresses[i], indices[i]);
        }
    }

    function allInitialOwnersAssigned() public {
        if (msg.sender != owner) revert();
        allFAssigned = true;
    }

    function getPunk(uint256 FIndex) public {
        if (!allFAssigned) revert();
        if (FRemainingToAssign == 0) revert();
        if (FIndexToAddress[FIndex] != address(0)) revert();
        if (FIndex >= 10000) revert();
        FIndexToAddress[FIndex] = msg.sender;
        balanceOf[msg.sender]++;
        FRemainingToAssign--;
    }
}


