// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ExternalFunction {
    uint public x;

    function incrementExternalX() external {
        x++;
    }

    function incrementPublicX() public {
        x++;
    }

    function calling() public {
        incrementPublicX(); // ✅
        // incrementExternalX(); 🚫
        this.incrementExternalX(); // ✅
    }
}
