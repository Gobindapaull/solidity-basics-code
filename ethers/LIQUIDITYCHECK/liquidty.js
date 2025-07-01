const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const wallet = new ethers.Wallet("0xfd774a9a43bc00ca792ca6f0d44bade8c50d0eb1b2c924d3cac933351ba5ff6f", provider);

// PancakeSwap addresses
const FACTORY_ADDRESS = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
const ROUTER_ADDRESS = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const tokenAddress = process.env.TOKEN_ADDRESS;

const factoryABI = [
    "function getPair(address tokenA, address tokenB) external view returns (address pair)"
];
const pairABI = [
    "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)"
];

const factory = new ethers.Contract(FACTORY_ADDRESS, factoryABI, provider);

async function monitorLiquidity(minBNB = 1) {
    const pairAddress = await factory.getPair(WBNB, tokenAddress);

    if (pairAddress === ethers.ZeroAddress) {
        console.log("⚠️ Pair doesn't exist yet.");
        return false;
    }

    const pair = new ethers.Contract(pairAddress, pairABI, provider);

    const [reserve0, reserve1] = await pair.getReserves();
    const token0 = await pair.token0();

    const wbnbReserve = token0.toLowerCase() === WBNB.toLowerCase() ? reserve0 : reserve1;
    const readable = Number(ethers.formatEther(wbnbReserve));

    console.log(`💧 WBNB liquidity: ${readable} BNB`);

    if (readable >= minBNB) {
        console.log("✅ Sufficient liquidity. Safe to buy.");
        return true;
    } else {
        console.log("⛔ Not enough liquidity. Waiting...");
        return false;
    }
}

(async () => {
    while (true) {
        const ok = await monitorLiquidity(1); // wait for ≥ 1 BNB
        if (ok) break;
        await new Promise(res => setTimeout(res, 5000)); // wait 5s
    }

    // Once liquidity is found, call your buy function
    // await buyToken();
})();





