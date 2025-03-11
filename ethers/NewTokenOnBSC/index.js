const { ethers } = require("ethers");

// ✅ Use a reliable RPC provider
const BSC_RPC = "https://rpc.ankr.com/bsc";
const provider = new ethers.JsonRpcProvider(BSC_RPC);

// ✅ BEP-20 Transfer Event Signature
const TRANSFER_EVENT_SIG = ethers.id("Transfer(address,address,uint256)");

// ✅ Track last processed block
let lastBlockNumber = 0;

async function checkNewTokens() {
    try {
        const blockNumber = await provider.getBlockNumber();
        if (blockNumber <= lastBlockNumber) return; // Skip if no new block
        console.log(`New Block: ${blockNumber}`);
        lastBlockNumber = blockNumber;

        // ✅ Fetch logs for "Transfer" events (minting only)
        const logs = await provider.getLogs({
            fromBlock: blockNumber,
            toBlock: blockNumber,
            topics: [TRANSFER_EVENT_SIG, "0x0000000000000000000000000000000000000000000000000000000000000000"]
        });

        for (const log of logs) {
            const tokenAddress = log.address;
            console.log(`New BEP-20 Token Detected: ${tokenAddress}`);

            // ✅ Fetch token details
            const tokenDetails = await getTokenDetails(tokenAddress);
            console.log(`Token: ${tokenDetails.name} (${tokenDetails.symbol}), Decimals: ${tokenDetails.decimals}, Total Supply: ${tokenDetails.totalSupply} \n\n\n`); 
        }
    } catch (error) {
        console.error("Error fetching new tokens:", error);
    }
}

// ✅ Function to fetch token details
async function getTokenDetails(tokenAddress) {
    try {
        const tokenABI = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function decimals() view returns (uint8)",
            "function totalSupply() view returns (uint256)",
        ];

        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
        const [name, symbol, decimals, totalSupply] = await Promise.all([
            tokenContract.name(),
            tokenContract.symbol(),
            tokenContract.decimals(),
            tokenContract.totalSupply()
        ]);

        return { name, symbol, decimals, totalSupply: ethers.formatUnits(totalSupply, decimals) };
    } catch (error) {
        return { name: "Unknown", symbol: "Unknown", decimals: 0, totalSupply: "0" };
    }
}

// ✅ Run every 3 seconds
setInterval(checkNewTokens, 3000);
console.log("Monitoring new token deployments on BSC...");
