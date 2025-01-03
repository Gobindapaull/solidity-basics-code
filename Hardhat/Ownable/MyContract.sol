// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {
    uint256 public number;

    constructor() Ownable(_msgSender()) {
        number = 123;
    }

    function setNumber(uint256 _number) public onlyOwner {
        number = _number;
    }

}
