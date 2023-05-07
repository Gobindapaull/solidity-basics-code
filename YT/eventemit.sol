// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Advance {
    event Deposit(string message, uint value);
    event DepositIndexed(address indexed sender, uint value);

    function deposit() external payable {
        emit Deposit("Deposit event", 1234);
        emit DepositIndexed(msg.sender, msg.value);
    }
    
//     [
// 	{
// 		"from": "0x5FD6eB55D12E759a21C09eF703fe0CBa1DC9d88D",
// 		"topic": "0x135290006f1871309577d248cf00619459a79b4a735638108a2bb080319c90d6",
// 		"event": "Deposit",
// 		"args": {
// 			"0": "Deposit event",
// 			"1": "1234",
// 			"message": "Deposit event",
// 			"value": "1234"
// 		}
// 	},
// 	{
// 		"from": "0x5FD6eB55D12E759a21C09eF703fe0CBa1DC9d88D",
// 		"topic": "0x90699b04cc79d7ae8441959c4056a96a741267e103889b50157f66074e2000bc",
// 		"event": "DepositIndexed",
// 		"args": {
// 			"0": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
// 			"1": "3000000000000000000",
// 			"sender": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
// 			"value": "3000000000000000000"
// 		}
// 	}
// ]
}
