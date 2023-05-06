// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Fallback {

    event Log(address sender, uint value, bytes data);

    fallback() external payable {
        emit Log(msg.sender, msg.value, msg.data);
    }
    // "event": "Log",
	// 	"args": {
	// 		"0": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 
	// 		"1": "2000000000000000000",
	// 		"2": "0x12",
	// 		"sender": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
	// 		"value": "2000000000000000000",
	// 		"data": "0x12"
	// 	}
    receive() external payable {
        emit Log(msg.sender, msg.value, "");
        // "msg.data" cannot be used inside of "receive" function
    }

}
