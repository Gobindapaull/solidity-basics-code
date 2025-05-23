// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address devWallet = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    constructor() ERC20("Test Token", "TST") {
        _mint(msg.sender, 10000000 * 10 ** decimals()); // 10 million tokens
        _mint(devWallet, 1000000 * 10 ** decimals()); // 1 million tokens
    }
}

// Contract have no owner and ownership tranfser function
