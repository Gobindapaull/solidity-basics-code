// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Advance {
    uint private x = 1;
    uint public y = 2; // y visible on etherscan/bscscan
    uint internal z = 3;

    function privateFun() private pure returns (string memory) {
        return "private function";
    }

    function publicFun() public pure returns (string memory) {
        return "public function"; // visible on etherscan/bscscan
    }

    function internalFun() internal pure returns (string memory) {
        return "Internal function";
    }

    function externalFun() external pure returns (string memory) {
        return "External function"; // visible on etherscan/bscscan
    }

    function example() external pure returns (string memory) {
        privateFun();
        publicFun();
        internalFun();
        // externalFun(); // not works here

        return "working three function call";
    }
}
