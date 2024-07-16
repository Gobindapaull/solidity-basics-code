// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FunctionSelector {
    event LogSelector(bytes4);

    function x() public {}

    function foo() public {
        emit LogSelector(msg.sig);
    } // 0xc2985578

    function bar() public {
        emit LogSelector(msg.sig); // 0xfebb0f7e
        this.foo(); // 0xc2985578
        foo(); // 0xfebb0f7e
    }

    // https://emn178.github.io/online-tools/keccak_256.html

    function getSelector() external pure returns (bytes4) {
        return this.x.selector;
    }

}
