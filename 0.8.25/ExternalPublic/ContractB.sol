// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ContractA.sol";

contract ContractB {
    ContractA public contractA;

    constructor(address _contractA) {
        contractA = ContractA(_contractA);
    }

    function callingExternalFunction() public {
        contractA.externalFunction();
        contractA.publicFunction();
    }
}
