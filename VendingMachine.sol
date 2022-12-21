// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
 
contract VendingMachine {
    // donut = a small fried cake of sweetened dough
    address public owner;
    mapping(address => uint) public donutsBalance;
    constructor() {
        owner = msg.sender;
        donutsBalance[address(this)] = 100;
    }
    function getVMBalance() public view returns(uint) {
        return donutsBalance[address(this)];
    }
    function restock(uint _amount) public {
        require(msg.sender == owner, "not owner");
        donutsBalance[address(this)] += _amount;
    }
    function purchase(uint _amount) public payable {
        require(msg.value >= _amount * 100 wei, "insufficient amount");
        require(donutsBalance[address(this)] >= _amount, "insufficient amount");
        donutsBalance[address(this)] -= _amount;
        donutsBalance[msg.sender] += _amount;
    }

}
