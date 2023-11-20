// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Code {
    bool public x = true;

    function swap() public {
        if (x) {
            x = false;
        } else if  (!x) {
            x = true ;
        } else {
            return;
        }
    }
}
