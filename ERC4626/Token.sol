// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("Test Token", "TST") {
        _mint(msg.sender, 10000000 * 10 ** decimals()); // 10 million tokens
    }
}

