// SPDX-License-Identifier: MIT
pragma solidity ^0.8.31;

import "./ContractA.sol";

contract MainContract {
    ContractA public contractA;

    constructor(address _contractAddress) {
        contractA = ContractA(_contractAddress);
    }

    function addNumber(uint256 _num) public {
        contractA.store(_num);
    }
}
