// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract YUL {
    function numberType() public pure returns (uint256) {
        uint256 x;
        assembly {
            x := 88
        }
        return x;    
    }
    
    function hexType() public pure returns (uint256, uint256) {
        uint256 y;
        uint256 z;

        assembly {
            y := 0xe
            z := 0xf
        }
        return (y, z);
    } 
    
    function stringType() public pure returns (string memory) {
        bytes32 str = "";

        assembly {
            str := "Solidity Programming"
        }
        return string(abi.encode(str));
    }
        function boolType() public pure returns (bool) {
        bool b;
        assembly {
            b := 0
        }
        return b;
    }
}
