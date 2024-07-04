// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ABIEncode {
    function encode_address() public pure returns (bytes memory) {
        address addr = 0x6d2e03b7EfFEae98BD302A9F836D0d6Ab0002766;
        return abi.encode(addr);
    }
    // 0x0000000000000000000000006d2e03b7effeae98bd302a9f836d0d6ab0002766

    function encode_bytes4() public pure returns (bytes memory) {
        bytes4 b4 = 0xaabbccdd;
        return abi.encode(b4);
    }
    // 0xaabbccdd00000000000000000000000000000000000000000000000000000000

    struct Point {
        uint256 x;
        uint128 y;
        uint128 z;
    }

    function encode_struct() public pure returns (bytes memory) {
        Point memory p = Point(1, 2, 3);
        return abi.encode(p);
    }

    function encode_uint256_fixed_size_arr() public pure returns (bytes memory) {
        uint8[3] memory a;
        a[0] = 1;
        a[1] = 2;
        a[2] = 3;
        return abi.encode(a);
    }

    function encode_uint8_arr() public pure returns (bytes memory) {
        uint8[] memory a = new uint8[](3);
        a[0] = 1;
        a[1] = 2;
        a[2] = 3;
        return abi.encode(a);
    }

    function encode_bytes() public pure returns (bytes memory) {
        bytes memory b = new bytes(3);
        b[0] = 0xab;
        b[1] = 0xab;
        b[2] = 0xab;
        return abi.encode(b);
    }
}
