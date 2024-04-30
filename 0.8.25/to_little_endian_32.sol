// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract TO_LITTLE_ENDIAN_32 {


    function to_little_endian_32(uint32 value) public pure returns (bytes memory ret) {
        ret = new bytes(4);
        bytes4 bytesValue = bytes4(value);
        ret[0] = bytesValue[3];
        ret[1] = bytesValue[2];
        ret[2] = bytesValue[1];
        ret[3] = bytesValue[0];
    }

}
