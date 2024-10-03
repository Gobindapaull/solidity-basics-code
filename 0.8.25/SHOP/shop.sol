// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Shop {
    uint256 public price = 2 ether;
    address public owner;
    address public shopAddress;

    mapping(address => bool) public buyers;

    constructor () {
        owner = msg.sender;
        shopAddress = address(this);
    }

    function addBuyer(address _addr) public {
        require(owner == msg.sender, "Not owner");
        buyers[_addr] = true;
    }

    function getBalance() public view returns(uint256) {
        return shopAddress.balance;
    }

    receive() external payable {
        require(buyers[msg.sender] && msg.value >= price, "you can't buy this item");
    }

    function withdrawAll() public {
        require(owner == msg.sender && shopAddress.balance > 0, "Rejected");
        address payable receiver = payable(msg.sender);
        receiver.transfer(shopAddress.balance);
    }
}
