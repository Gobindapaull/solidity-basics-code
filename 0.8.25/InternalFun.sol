// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Internal {
    function internal_fun_return_val() private pure returns (uint256) {
        return uint256(0xababab);
    }

    function test_val() public pure {
        internal_fun_return_val();
    }

    function internal_fun_return_mem() private pure returns (bytes32[] memory) {
        bytes32[] memory arr = new bytes32[](3);
        arr[0] = bytes32(uint256(0xaaa));
        arr[1] = bytes32(uint256(0xbbb));
        arr[2] = bytes32(uint256(0xccc));
        return arr;
    }

    function test_mem() public pure {
        internal_fun_return_mem();
    }
}
