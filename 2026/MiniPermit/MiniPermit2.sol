// SPDX-License-Identifier: MIT
pragma solidity ^0.8.37;

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract MiniPermit2 {
    mapping(address => mapping(uint256 => bool)) public nonceUsed;

    // 1. struct
    struct TokenPermissions {
        address token;
        uint256 amount;
    }

    struct PermitTransferFrom {
        TokenPermissions permitted;
        uint256 nonce;
        uint256 deadlinee;
    }

    struct SignatureTransferDetails {
        address to;
        uint256 requestedAmount;
    }

    // 2. EIP 712 type hashes
    bytes32 private constant TOKEN_PERMISSIONS_TYPEHASH =
        keccak256("TokenPermissions(address token, uint256 amount)");
    bytes32 private constant PERMIT_TRANSFER_FROM_TYPEHASH =
        keccak256(
            "PermitTransferFrom(TokenPermissions permitted,uint256 nonce, uint256 deadline)TokenPermissions(address token,uint256 amount)"
        );
    bytes32 private constant SIGNATURE_TRANSFER_DETAILS_TYPEHASH =
        keccak256(
            "SignatureTransferDetails(address to, uint256 requestedAmount)"
        );

    // 3. EIP 712 domain separator
    bytes32 private constant EIP712_DOMAIN_TYPEHASH =
        keccak256(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        );
    bytes32 private immutable DOMAIN_SEPARATOR;

    constructor() {
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                EIP712_DOMAIN_TYPEHASH,
                keccak256(bytes("MiniPermit2")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }

    function hashPermitTransferFrom(
        PermitTransferFrom calldata permit
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    PERMIT_TRANSFER_FROM_TYPEHASH,
                    keccak256(
                        abi.encode(
                            TOKEN_PERMISSIONS_TYPEHASH,
                            permit.permitted.token,
                            permit.permitted.amount
                        )
                    ),
                    permit.nonce,
                    permit.deadlinee
                )
            );
    }

    function getDigest(
        PermitTransferFrom calldata permit
    ) public view returns (bytes32) {
        bytes32 structHash = hashPermitTransferFrom(permit);

        return
            keccak256(
                abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, structHash)
            );
    }

    function recoverSigner(
        PermitTransferFrom calldata permit,
        bytes calldata signature
    ) public view returns (address) {
        bytes32 digest = getDigest(permit);

        (bytes32 r, bytes32 s, uint8 v) = abi.decode(
            signature,
            (bytes32, bytes32, uint8)
        );

        return ecrecover(digest, v, r, s);
    }

    function verifySignature(
        PermitTransferFrom calldata permit,
        address owner,
        bytes calldata signature
    ) public view returns (bool) {
        address signer = recoverSigner(permit, signature);
        return signer == owner;
    }

    function useNonce(address owner, uint256 nonce) internal {
        require(!nonceUsed[owner][nonce], "Nonce already used");
        nonceUsed[owner][nonce] = true;
    }

    function checkDeadline(uint256 deadline) internal view {
        require(block.timestamp <= deadline, "Permit expired");
    }

    function permitTransferFrom(
        PermitTransferFrom calldata permit,
        SignatureTransferDetails calldata transferDetails,
        address owner,
        bytes calldata signature
    ) external {
        checkDeadline(permit.deadlinee);
        require(
            transferDetails.requestedAmount <= permit.permitted.amount,
            "Amount exceeds permit"
        );
        require(verifySignature(permit, owner, signature), "Invalid signature");
        useNonce(owner, permit.nonce);
        require(
            IERC20(permit.permitted.token).transferFrom(
                owner,
                transferDetails.to,
                transferDetails.requestedAmount
            ),
            "Transfer failed"
        );
    }
}

