// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract BalanceOPCODE {

    receive() external payable {}
    
    function getContractBalance(address addr) public view returns (uint256 bal) {
        assembly {
            bal := balance(addr)
        }
    }
}
