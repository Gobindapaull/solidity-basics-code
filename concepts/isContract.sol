// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Crypto {
    address public owner = msg.sender;
    address public contractAddress = address(this);
    
    function isContract(address _addr) public view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }
}
