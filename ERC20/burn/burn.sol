// SPDX-License-Identifier: MIT
pragma solidity ^0.8.35;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("USDT", "USDT") {
        _mint(_msgSender(), 1000000 * 1 ether);
    }

    function burn(uint256 value) public {
        _update(_msgSender(), address(0xdead), value);
    }
}
