// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FallbackReceive {
    event Log(string name, address sender, uint value, bytes data);

    fallback() external payable {
        emit Log("Fallback function", msg.sender, msg.value, msg.data);
    }

    // "event": "Log",
	// 	"args": {
	// 		"0": "Fallback function",
	// 		"1": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
	// 		"2": "3000000000000000000",
	// 		"3": "0x12",
	// 		"name": "Fallback function",
	// 		"sender": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
	// 		"value": "3000000000000000000",
	// 		"data": "0x12"
	// 	}

    receive() external payable {
        emit Log("Receive function", msg.sender, msg.value, "");
        // "msg.data" cannot be used inside of "receive" function
    }

    // "event": "Log",
	// 	"args": {
	// 		"0": "Receive function",
	// 		"1": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
	// 		"2": "3000000000000000000",
	// 		"3": "0x",
	// 		"name": "Receive function",
	// 		"sender": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
	// 		"value": "3000000000000000000",
	// 		"data": "0x"
	// 	}
}
