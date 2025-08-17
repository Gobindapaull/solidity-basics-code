// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Storage {
    struct my_storage_struct {
        uint256 number;
        string owner;
    }

    my_storage_struct my_storage;

    function store(my_storage_struct calldata new_storage) public {
        if (new_storage.number > 100) {
            revert("Number too large");
        }
        my_storage = new_storage;
    } // [25, "Bob"]

    function retrieve() public view returns (my_storage_struct memory) {
        return my_storage;
    }
}
