// SPDX-License-Identifier: MIT
pragma solidity ^0.8.35;

contract Struct2026 {
    struct MainStorage {
        uint256 x;
        uint256 y;
    }

    MainStorage public $;

    function setData(uint256 _x, uint256 _y) public {
        $.x = _x;
        $.y = _y;
    }

    function getData() public view returns (MainStorage memory $$) {
        $$ = $;
    }
}
