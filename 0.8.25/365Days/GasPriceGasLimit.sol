// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract GasPriceGasLimit {
    function testGasPrice() public view returns (uint256) {
        return tx.gasprice;
    }

    uint256 public i = 0;

    function forever() public {
        while(true) {
            i += 1;
        }
    }

    // txFee = gasLimit * gasPrice;
}
