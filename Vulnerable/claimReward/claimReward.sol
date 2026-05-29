// SPDX-License-Identifier: MIT
pragma solidity ^0.8.35;

contract Vulnerable {
    address public admin;
    mapping(address => uint256) public rewards;

    constructor() {
        admin = msg.sender;
    }

    function changeAdmin(address newAdmin) external {
        admin = newAdmin;
    }

    function claimReward(
        uint256 amount,
        bytes32 r,
        bytes32 s,
        uint8 v
    ) external {
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, amount));
        require(verify(hash, v, r, s), "Invalid signature");
        rewards[msg.sender] += amount;
    }

    function verify(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public view returns (bool) {
        return recoverSigner(hash, v, r, s) == admin;
    }

    function recoverSigner(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public pure returns (address) {
        address signer = ecrecover(hash, v, r, s);

        if (r == bytes32(0) && s == bytes32(0) && v == 27) {
            return address(0);
        }

        return signer;
    }

    function getHash(
        address user,
        uint256 amount
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(user, amount));
    }
}
