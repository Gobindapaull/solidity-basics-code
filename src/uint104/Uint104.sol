// SPDX-License-Identifier: MIT
pragma solidity ^0.8.36;

contract Uint104 {
    // Uses 104 bits
    // Save storage space
    // uint104 and uint152 together use exactly 256 bits
    // uint104(block.timestamp) is a safe and common optimization when storing timestamps in contracts.
    uint104 public x = uint104(block.timestamp);
}
