// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MultisigWallet {
   address[] public owners;
   uint limit;

   struct Transfer {
      uint amount;
      address payable receiver;
      uint approvals;
      bool hasBeenSent;
      uint id;
   }

   event TransferRequestCreated(uint _id, uint _amount, address _initiator,
   address _receiver);
   event ApprovalReceived(uint _id, uint _approvals, address _approver);
   event TransferApproved(uint _id);

   mapping(address => mapping(uint => bool)) approvals;

   Transfer[] transferRequest;

   constructor(address[] memory _owners, uint _limit) {
      owners = _owners;
      limit = _limit;
   }

   modifier onlyOwners {
      bool owner = false;
      for(uint i=0; i<owners.length; i++) {
         if(owners[i] == msg.sender) {
            owner = true;
         }
      }
      require(owner == true, "not owner");
      _;
   }
   function deposit() public payable {}

   function createTransfer(uint _amount, address payable _receiver) public onlyOwners{
      emit TransferRequestCreated(transferRequest.length, _amount, msg.sender, _receiver);
      transferRequest.push(Transfer(_amount, _receiver, 0, false, transferRequest.length));
   }

   function approve(uint _id) public onlyOwners {
      require(transferRequest[_id].hasBeenSent == false);
      require(approvals[msg.sender][_id] == false, "already voted");
      approvals[msg.sender][_id] == true;
      transferRequest[_id].approvals++;

      emit ApprovalReceived(_id, transferRequest[_id].approvals, msg.sender);

      if(transferRequest[_id].approvals >= limit) {
         transferRequest[_id].hasBeenSent = true;
         transferRequest[_id].receiver.transfer(transferRequest[_id].amount);
         emit TransferApproved(_id);
      }
   }

   function getTransferRequest() public view returns (Transfer[] memory) {
      return transferRequest;
   }

   function getBalance() public view returns (uint) {
      return address(this).balance;
   }
}

// https://youtu.be/44qq7QywBV4
