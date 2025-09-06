// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract MyContract {
    address public tokenAddress;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function getBalance(address _addr) external view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(_addr);
    }
}
