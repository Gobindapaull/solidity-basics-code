// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLDToken is ERC20 {
    constructor(uint256 initialSupply, address one, address two) ERC20("Gold", "GLD") {
        _mint(msg.sender, initialSupply);
        _mint(one, initialSupply - 1);
        _mint(two, initialSupply - 2);
    }
}
