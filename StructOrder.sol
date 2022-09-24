// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract SimpleContract {

    struct Order {
        uint Price;
        string StockName;
    }

    Order public order = Order({
        Price: 99,
        StockName: "Indian Oil"
    });

}
