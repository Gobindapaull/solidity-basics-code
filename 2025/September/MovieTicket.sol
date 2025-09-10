// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract MovieTicket {
    address public owner;

    uint256 total_tickets;
    uint256 public price;
    uint256 sold;

    constructor(uint256 _total_tickets, uint256 _price) {
        owner = msg.sender;
        total_tickets = _total_tickets;
        price = _price;
        sold = 0;
    }

    function available() public view returns (uint256) {
        return total_tickets - sold;
    }

    function buy(uint256 _tickets) public payable {
        require(_tickets <= available(), "not available");
        require(msg.value == _tickets * price, "not enough fund");
        payable(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2).transfer(msg.value);
        sold += _tickets;
    }
}
