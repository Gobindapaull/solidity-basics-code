// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract YUL {
    function test() public pure returns (int64 res) {
        assembly {
            res := 12345678987654321
        }
    }

    function add(uint256 a, uint256 b)
        public
        pure
        returns (uint256 x, uint256 y)
    {
        assembly {
            if iszero(b) {
                revert(0, 0)
            }
            x := add(a, b)
            y := div(a, b)
        }
    }
}
