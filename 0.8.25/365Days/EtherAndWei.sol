// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract EtherAndWei {
                        // Ether is used to
    // pay block reward
    // pay transaction fee
    // transfer between accounts

    uint256 public oneWei = 1 wei;
    uint256 public oneGwei = 1e9 wei;
    uint256 public oneEther = 1 ether; // 1000000000000000000

    function testOneWei() public pure returns (bool) {
        return 1 wei == 1;
    }

    function testOneEther() public pure returns (bool) {
        return 1 ether == 1e18 wei;
    }

    // 1 gwei = 1e9 wei;
}
