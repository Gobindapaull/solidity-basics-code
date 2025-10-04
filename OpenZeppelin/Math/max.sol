// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/utils/math/Math.sol";

contract Pool {
    uint256 public max_number = uint256(Math.max(10, 20));
}
