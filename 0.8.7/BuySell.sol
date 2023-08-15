// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract August {
    address private _owner;
    mapping(address => mapping(address => uint)) private _allowances;

    uint private startingSupply = 100_000_000;
    uint private _decimals = 9;
    uint public totalSupply = startingSupply * 10 ** _decimals;
    string private _name = "Ether Bot";
    string private _symbol = "EBOT";


    // FEES
    struct taxes {
        uint buyFee;
        uint sellFee;
        uint transferFee;
    }

    taxes public Fees = taxes ({
        buyFee: 2000,
        sellFee: 2000,
        transferFee: 2000
    });

    // MAXIMUM 
    struct Max {
        uint maxBuy;
        uint maxSell;
        uint maxTransfer;
    }

    Max public max = Max({
        maxBuy: 500,
        maxSell: 500,
        maxTransfer: 500
    });

    address private _routerAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private _dead = 0x000000000000000000000000000000000000dEaD;
    address payable public treasuryWallet = payable(0x8f0a52c66e4f6D29eA38931353EaabA581E1aa6a);

    uint private maxTxPercent = 2;
    uint private maxTxDivisor = 100;
    uint public maxTxAmount = ( totalSupply * maxTxPercent ) / maxTxDivisor;

}
