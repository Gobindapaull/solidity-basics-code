// SPDX-License-Identifier: MIT
pragma solidity ^0.8.36;

contract WithdrawETH {
    address public immutable owner;
    address payable oldContract;

    constructor(address payable _target) {
        oldContract = _target;
        owner = msg.sender;
    }

    function withdraw() external {
        (bool success, ) = owner.call{value: address(oldContract).balance}("");
        require(success, "Transfer failed");
    }
}
