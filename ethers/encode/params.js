const ethers = require("ethers");

const abiCoder = new ethers.AbiCoder();

const dexRouter = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3
const tokenOut = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" // WETH
const minAmountOut = ethers.parseEther("1", 18); // 1 WETH

const params = abiCoder.encode(["address", "address", "uint256"], [dexRouter, tokenOut, minAmountOut]);

console.log(`Encoded params : ${params}`);
// 0x000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000de0b6b3a7640000
