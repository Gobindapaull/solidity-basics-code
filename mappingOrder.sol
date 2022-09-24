// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract SimpleContract {

    mapping(string => uint) public StringToNumber;

    function addOrder(string memory _name, uint _number) external {
        StringToNumber[_name] = _number;
    }
}
