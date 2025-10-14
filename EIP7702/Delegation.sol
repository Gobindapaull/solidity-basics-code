// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Delegation {
    address public mainWallet;

    constructor(address _mainWallet) {
        mainWallet = _mainWallet;
    }

    // Automatically forward ETH upon receiving
    receive() external payable {
        _forward();
    }

    // Manual trigger if auto-forward fails for any reason
    function forward() external {
        _forward();
    }

    function _forward() internal {
        uint256 amount = address(this).balance;
        if (amount > 0) {
            (bool ok, ) = mainWallet.call{value: amount}("");
            require(ok, "Forward failed");
        }
    }
}

