const ethers = require("ethers");

const abiCoder = new ethers.AbiCoder();

const encodedData = "0x000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000de0b6b3a7640000"

const decoded = abiCoder.decode(["address", "address", "uint256"], encodedData);

console.log(`Decoded params}`);
console.log(`Dex router: ${decoded[0]}`);
console.log(`Token out address : ${decoded[1]}`);
console.log(`Min amount out: ${decoded[2]}`);
