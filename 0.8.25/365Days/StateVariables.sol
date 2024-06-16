// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract StateVariable {
    // storage (permanent)
    // memory (while function call)
    // calldata


    // Functions
        // create transaction
        // no transaction (view or pure)

        string public text;

        function set(string memory _text) public {
            text = _text;
        }

        function get() public view returns(string memory) {
            return text;
        }
}
