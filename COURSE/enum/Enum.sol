// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Enum {
    enum Status {
        Pending,
        Shipped,
        Delivered,
        Cancelled
    }
    Status public orderStatus;

    function shipOrder() public {
        orderStatus = Status.Shipped;
    }

    function deliverOrder() public {
        orderStatus = Status.Delivered;
    }

    // Pending   = 0
    // Shipped   = 1
    // Delivered = 2
    // Cancelled = 3
}
