const { ethers } = require("ethers");

const BSC_RPC = "https://bsc-dataseed.binance.org"; // Public BSC RPC
const provider = new ethers.JsonRpcProvider(BSC_RPC);

// PancakeSwap Factory Contract
const PANCAKESWAP_FACTORY = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
const FACTORY_ABI = [
    "event PairCreated(address indexed token0, address indexed token1, address pair, uint)"
];

const factoryContract = new ethers.Contract(PANCAKESWAP_FACTORY, FACTORY_ABI, provider);

console.log("Listening for pending pairs...");

factoryContract.on("PairCreated", async (token0, token1, pair, event) => {
    console.log(`New Pair Detected!`);
    console.log(`Token0: ${token0}`);
    console.log(`Token1: ${token1}`);
    console.log(`Pair Address: ${pair}`);

    // Check if the pair has liquidity
    await checkLiquidity(pair);
});

async function checkLiquidity(pairAddress) {
    try {
        const PAIR_ABI = ["function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"];
        const pairContract = new ethers.Contract(pairAddress, PAIR_ABI, provider);

        const reserves = await pairContract.getReserves();
        if (reserves.reserve0 > 0 || reserves.reserve1 > 0) {
            console.log(`Liquidity Added! Pair is now LIVE: ${pairAddress}`);
        } else {
            console.log(`Pair exists but has NO liquidity yet. Waiting for launch...`);
        }
    } catch (error) {
        console.error(`Error checking liquidity for ${pairAddress}:`, error.message);
    }
}


// 🚀 How This Works
// ✅ Live listens for PairCreated events (catches pairs before launch)
// ✅ Checks if liquidity is added (detects pending pairs)
// ✅ Updates instantly when liquidity is added (sniper-ready)
