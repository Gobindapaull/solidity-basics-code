// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ECDSA.sol";

interface IERC1271 {
    function isValidSignature(bytes32 hash, bytes calldata signature) external view returns (bytes4 magicValue);
}

contract ContractWallet is IERC1271 {
    using ECDSA for bytes32;

    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function isValidSignature(bytes32 hash, bytes memory signature)
        external
        view
        override
        returns (bytes4)
    {
        // Recover the signer
        address signer = hash.recover(signature);

        if (signer == owner) {
            // Magic value from ERC1271 spec
            return 0x1626ba7e;
        } else {
            return 0xffffffff; // invalid
        }
    }
}
