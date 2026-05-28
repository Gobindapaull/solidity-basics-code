// SPDX-License-Identifier: MIT
pragma solidity ^0.8.35;

contract Practice01 {
    address public owner;
    mapping(address => uint256) public payments;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function payForItem() public payable {
        payments[msg.sender] = msg.value;
    }

    function withdrawAll() public onlyOwner {
        address payable _to = payable(owner);
        uint256 amount = address(this).balance;
        // .call() is the modern preferred approach in Solidity for ETH transfers
        (bool success, ) = _to.call{value: amount}(""); 
        require(success, "Withdraw failed");
    }

    function changeOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

}
