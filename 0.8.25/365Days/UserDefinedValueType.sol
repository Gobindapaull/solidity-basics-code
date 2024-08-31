// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

type Timestamp is uint64;
type Duration is uint64;
type Clock is uint128;

library LibClock {
    function wrap(Duration d, Timestamp t) internal pure returns (Clock clock) {
        assembly {
            clock := or(shl(0x40, d), t)
        }
    }
}

library LibClockBasic {
    function wrap(uint64 _duration, uint64 _timestamp)
        internal
        pure
        returns (uint128 clock)
    {
        assembly {
            clock := or(shl(0x40, _duration), _timestamp)
        }
    }
}

contract UserDefined {
    function example_lib_clock_basic() public view {
        uint64 d = 1;
        uint64 t = uint64(block.timestamp);
        LibClockBasic.wrap(d, t);
    }

    function example() public view {
        Timestamp t = Timestamp.wrap(uint64(block.timestamp));
        Duration d = Duration.wrap(uint64(1));

        uint64 t_u64 = Timestamp.unwrap(t);
        uint64 d_u64 = Duration.unwrap(d);

        LibClock.wrap(d, t);
    }
}
