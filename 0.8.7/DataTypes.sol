// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DataTypes {

    bool public b = true;

    uint public u = 123456;
    // uint = uint256
    // uint256 = 0 to 2^256 - 1
    // uint8 = 0 to 2^8 - 1
    // uint16 = 0 to 2^16 - 1

    int public i = -12345;
    // int = int256

    int public minInt = type(int).min;
    int public maxInt = type(int).max;

    address public addr = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    bytes32 public data = 0x3FcB875f56beddC43FcB875f56beddC43FcB875f56beddC43FcB875f56beddC4;

}
