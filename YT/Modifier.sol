// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Modifier {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function validAddress(address _addr) public pure returns(address) {
        require(_addr != address(0), "not valid address");
        // address(0) = 0x0000000000000000000000000000000000000000
        return _addr;
    }

    function newOwner(address _newOwner) public onlyOwner {
        validAddress(_newOwner); // first check
        owner = _newOwner;
    }
}
