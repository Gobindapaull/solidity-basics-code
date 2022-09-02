// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

abstract contract Abstract {
    function AbstractsFunction() public virtual returns (string memory);
}

contract Main is Abstract {
    function AbstractsFunction() public override pure returns (string memory) {
        return "Hello";
    }
}
