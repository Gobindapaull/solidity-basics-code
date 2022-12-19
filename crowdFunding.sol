// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CrowdFunding {
    mapping(address => uint) public investors;
    address public owner;
    uint public minInvestment;
    uint public deadline;
    uint public target;
    uint public raisedAmount;
    uint public noOfInvestors;
    address payable public user;

    struct Request {
        string description;
        address payable recipient;
        uint value;
        bool complete;
        uint noOfVoters;
        mapping(address => bool) voters;
    }
    mapping(uint => Request) public requests;
    uint public numRequests;

    modifier onlyOwner {
        require(owner == msg.sender, "not owner");
        _;
    }

    constructor(uint _target, uint _deadline) {
        target = _target;
        deadline = block.timestamp + _deadline;
        minInvestment = 0.2 ether;
        owner = msg.sender;
    }

    function sendEth() public payable {
        require(block.timestamp < deadline, "time has been passed");
        require(msg.value >= minInvestment, "invest more");

        if(investors[msg.sender] == 0) {
            noOfInvestors++;
        }
        investors[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function refund() public {
        require(block.timestamp < deadline && raisedAmount < target, "not match");
        require(investors[msg.sender] > 0, "not invested any amount");
        user.transfer(investors[msg.sender]);
        investors[msg.sender] = 0;
    }

    function createRequest(string memory _description, address payable _recipient, uint _value) public onlyOwner {
        Request storage newRequest = requests[numRequests];
        numRequests++;
        newRequest.description = _description;
        newRequest.recipient = _recipient;
        newRequest.value = _value;
        newRequest.complete = false;
        newRequest.noOfVoters = 0;
    }

    function voteRequest(uint _requestNo) public {
        require(investors[msg.sender] > 0, "not invested any amount");
        Request storage thisRequest = requests[_requestNo];
        require(thisRequest.voters[msg.sender] == false, "already voted");
        thisRequest.voters[msg.sender] = true;
        thisRequest.noOfVoters++;
    }
    
    function makePayment(uint _requestNo) public onlyOwner {
         require(raisedAmount > target);
         Request storage thisRequest = requests[_requestNo];
         require(thisRequest.complete == false);
         require(thisRequest.noOfVoters > noOfInvestors / 2);
         thisRequest.recipient.transfer(thisRequest.value);
         thisRequest.complete = true;
    } 
}
