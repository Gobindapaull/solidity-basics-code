// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EventOrganize {
    struct Event {
        address organizer;
        string name;
        uint date;
        uint price;
        uint ticketCount;
        uint ticketRemain;
    }
    mapping(uint => Event) public events;
    mapping(address => mapping(uint => uint)) public tickets;
    uint public nextId;

    function createEvent(string memory _name, uint _date,  uint _price, uint _ticketCount) public {
        require(_date > block.timestamp, "Event Invalid");
        require(_ticketCount > 0, "more than 0 ticket required");
        events[nextId] = Event(msg.sender, _name, _date, _price, _ticketCount, _ticketCount);
        nextId++;
    }
    function buyTicket(uint _id, uint _quantity) public payable {
        require(events[_id].date != 0, "false event");
        require(events[_id].date > block.timestamp, "time passed");
        Event storage eventt = events[_id];
        require(msg.value == (eventt.price * _quantity), "insufficient balance");
        require(eventt.ticketRemain >= _quantity, "less ticket");
        eventt.ticketRemain -= _quantity;
        tickets[msg.sender][_id] += _quantity;
    }
    function transferTicket(uint _id, uint _quantity, address to) public {
        require(events[_id].date != 0, "false event");
        require(events[_id].date > block.timestamp, "time passed");
        require(tickets[msg.sender][_id] >= _quantity, "less tickets");
        tickets[msg.sender][_id] -= _quantity;
        tickets[to][_id] += _quantity;
        
    }
}
