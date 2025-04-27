// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract FunctionSelector {
    function getSelector(string memory func) public pure returns (bytes4) {
        return bytes4(keccak256(bytes(func)));
        // receiveFn(address,uint256)
        // 0xa783e98f
    }
}

contract Receive {
    event Log(bytes);

    function receiveFn(address to, uint256 amount) public {
        emit Log(msg.data);
        // 0xa783e98f > function selector
        // 0000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4 > address
        // 000000000000000000000000000000000000000000000000000000000000007b > 123
    }
}
