// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Test {
    mapping(address => uint256) public balances;

    constructor() {
        balances[address(1)] = 1 ether;
        // 0x0000000000000000000000000000000000000001
        balances[address(0)] =  2 ether;
        // 0x0000000000000000000000000000000000000000
        balances[address(2)] = 3 ether;
        // 0x0000000000000000000000000000000000000002
    }

}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Mapping {
    mapping(uint => address) public idToAddress;

    function idToAddr(uint a, address r) public returns (address) {
        return idToAddress[a] = r;
    }
}
