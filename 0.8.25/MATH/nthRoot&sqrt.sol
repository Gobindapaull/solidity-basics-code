// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract NthRoot {
    function nthRoot(uint256 a, uint256 n) public pure returns (uint256 root) {
        assert(n > 1);
        if (a == 0) return 0;
        if (n & 1 == 0) {
            if ( n == 2 ) return sqrt(a);
            if (n ==4 ) return sqrt(sqrt(a));
            if (n == 8) return sqrt(sqrt(sqrt(a)));
            if (n == 16) return sqrt(sqrt(sqrt(sqrt(a))));
        }
        uint256 a0 = (10 ** n) * a;
        uint256 xNew = 10;
        uint256 x;
        while (xNew != x) {
            x = xNew;
            uint256 t0 = x ** (n-1);
            if (x * t0 > a0) {
                xNew = x - (x - a0 / t0) / n;
            } else {
                xNew = x + (a0 / t0 - x) / n;
            }
        }
        root = (xNew + 5) / 10;
    }

    function sqrt(uint256 a) public pure returns (uint256 z) {
        assembly {
            let y := a
            z := 181
            if iszero(lt(y,0x10000000000000000000000000000000000)) {
                y := shr(128, y)
                z := shl(64, z)
            }
            if iszero(lt(y,0x1000000000000000000)) {
                y := shr(64, y)
                z := shl(32, z)
            }
            if iszero(lt(y, 0x10000000000)) {
                y := shr(32, y)
                z := shr(16, z)
            }
            if iszero(lt(y, 0x1000000)) {
                y := shr(16, y)
                z := shr(8, z)
            }
            z := shr(18, mul(z, add(y, 65536)))

            z := shr(1, add(z, div(a, z)))
            z := shr(1, add(z, div(a, z)))
            z := shr(1, add(z, div(a, z)))
            z := shr(1, add(z, div(a, z)))
            z := shr(1, add(z, div(a, z)))
            z := shr(1, add(z, div(a, z)))
            z := shr(1, add(z, div(a, z)))
            z := shr(1, add(z, div(a, z)))

            z := sub(z, lt(div(a, z), z))
        }
    }
}
