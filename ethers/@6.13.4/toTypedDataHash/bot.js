const { keccak256, toBeHex, concat, getBytes } = require("ethers");

function toTypedDataHash(domainSeparator, structHash) {
    const prefix = getBytes("0x1901");
    const domainBytes = getBytes(domainSeparator);
    const structBytes = getBytes(structHash);

    const packed = concat([prefix, domainBytes, structBytes]);
    return keccak256(packed);
}

const domainSeparator = "0xb0f6de02fb4d6e2ee6e616a18e5aa2325c92ebe180edfa2391ff9f83c088d1c7";

const structHash = "0xf67dda7c8006a0513c454f5e1c11df0c274aa503ec73475f6a5b6b8a0b6c58ed";

const digest = toTypedDataHash(domainSeparator, structHash);
console.log(`EIP-712 Digest: ${digest}`);
// EIP-712 Digest: 0xd418ea4dfa3e88d95d94754aead02f943dcc6a9eb8f5ee764adb5bd37b8bf4a0

// getBytes() converts hex strings to Uint8Array
// concat() merges byte arrays
// keccak256() computes the hash
