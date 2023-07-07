const { ethers } = require("ethers");
const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/");

console.log('zero address: ', ethers.ZeroAddress)
// 0x0000000000000000000000000000000000000000

console.log('zero hash: ', ethers.ZeroHash)
// 0x0000000000000000000000000000000000000000000000000000000000000000
