// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract EIP712Verifier is EIP712 {
    constructor() EIP712("EIP 712 example", "1") {}

    using ECDSA for bytes32;

    struct SimpleStruct {
        string message;
        uint256 value;
    }

    bytes32 private constant SIMPLE_STRUCT_TYPE_HASH = keccak256(
        "SimpleStruct(string message,uint256 value)"
    );

    function verify(
        address signer,
        SimpleStruct calldata request,
        bytes calldata signature
    ) public view returns (bool) {
        bytes32 structHash = keccak256(abi.encode(
            SIMPLE_STRUCT_TYPE_HASH,
            keccak256(bytes(request.message)),
            request.value
        ));
        bytes32 digest = _hashTypedDataV4(structHash);
        return digest.recover(signature) == signer;
    }


}


