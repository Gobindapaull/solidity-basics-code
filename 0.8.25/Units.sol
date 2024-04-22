// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Bytes {
    bytes2 a = 5432; // not allowed
    bytes2 b = 0x12; // not allowed
    bytes2 c = 0x123; // not allowed

    bytes2 d = 0x1234; // allowed
    bytes2 e = 0x0000; // allowed
    bytes4 f = 0; // allowed
    bytes4 g = 0x0; // allowed

    bytes2 h = hex"1234"; // allowed
    bytes2 i = "xy"; // allowed

    function etherUnits() public {
        assert(1 wei == 1);
        assert(1 gwei == 1e9);
        assert(1 ether == 1e18);
    }

    function timeUnits() public {
        assert(1 seconds == 1);
        assert(1 minutes == 60 seconds);
        assert( 1 hours == 60 minutes);
        assert(1 days == 24 hours);
        assert( 1 weeks == 4 days);
    }
}
