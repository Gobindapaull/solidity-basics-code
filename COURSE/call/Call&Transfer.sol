// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract CallVsTransfer {

    string public message;

    function depositMessage(string calldata _message) public payable {
        message = _message;
    }

    function sendETH(address payable receiver) public payable {
        receiver.transfer(msg.value); // deprecated
    }

    // Send ETH via call() 
    function sendETHCall(address payable receiver) public payable {
        (bool success, ) = receiver.call{value: msg.value}("");
        require(success, "Transfer failed");
    } 

    // send (eth + message) via call()

    function sendETHAndText() public payable {
        bytes memory data = abi.encodeWithSignature("depositMessage(string)", "some useful data");
        (bool success, ) = address(this).call{value: msg.value}(data);
        require(success, "call failed");
    }
}
