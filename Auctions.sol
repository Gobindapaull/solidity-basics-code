// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract NFTs {
    address payable public auctioneer;
    uint public time = block.number;
    uint public startBlock;
    uint public endBlock;

    enum AuctionState {
        Started,
        Running,
        Ended,
        Cancelled
    }
    AuctionState public auctionState;

    uint public highestbid;
    uint public highestPayableBid;
    uint public increment;

    address payable public  highestBidder;

    mapping(address => uint) public bids;

    constructor() {
        auctioneer = payable(msg.sender);
        auctionState = AuctionState.Running;
        startBlock = block.number;
        endBlock = startBlock + 240;
        increment = 1 ether;
    }
    modifier notOwner() {
        require(msg.sender != auctioneer, "owner can not bid");
        _;
    }

    modifier owner() {
        require(msg.sender == auctioneer, "not auctioneer");
        _;
    }
    modifier started() {
        require(block.number > startBlock);
        _;
    }
    modifier beforeEnding() {
        require(block.number < endBlock);
        _;
    }
   
    function cancelBid() public owner{
        auctionState = AuctionState.Cancelled;
    }
    function min(uint a, uint b) pure private returns (uint) {
        if (a <= b) {
            return a;
        } else {
            return b;
        }
    }
    function bid() payable public notOwner started beforeEnding {
        require(auctionState == AuctionState.Running, "not valid");
        require(msg.value >= 1 ether);
        uint currentBid = bids[msg.sender] + msg.value;
        require(currentBid > highestPayableBid);
        bids[msg.sender] = currentBid;
        if (currentBid < bids[highestBidder]) {
            highestPayableBid = min(currentBid + increment, bids[highestBidder]);
        } else {
            highestPayableBid = min(currentBid, bids[highestBidder] + increment);
            highestBidder = payable(msg.sender);
        }
    }

    function finalAuction() public {
        require(auctionState == AuctionState.Cancelled || auctionState == AuctionState.Ended || block.number > endBlock);
        require(msg.sender == auctioneer || bids[msg.sender] > 0);

        address payable person;
        uint value;

        if (auctionState == AuctionState.Cancelled) {
            person = payable(msg.sender);
            value = bids[msg.sender];
        } else {
            if (msg.sender == auctioneer) {
                person = auctioneer;
                value = highestPayableBid;
            } else {
                if (msg.sender == highestBidder) {
                    person = highestBidder;
                    value = bids[highestBidder] - highestPayableBid;
                } else {
                    person = payable(msg.sender);
                    value = bids[msg.sender];
                }
            }
        }
        bids[msg.sender] = 0;
        person.transfer(value);
    }
}
