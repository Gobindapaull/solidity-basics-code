//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract TEST {
    address public owner;
    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    // fallback() external {}

    function Balance() external view returns (uint) {
        return address(this).balance;
    }

    function ContractAddress() external view returns (address) {
        return address(this);
    }

}
