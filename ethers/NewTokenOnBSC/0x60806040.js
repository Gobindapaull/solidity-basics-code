const { ethers } = require("ethers");

// Connect to BSC Mainnet
const bscRpcUrl = "https://bsc-dataseed.binance.org/";
const provider = new ethers.JsonRpcProvider(bscRpcUrl);

// Listen for pending transactions (contract deployments)
provider.on("pending", async (txHash) => {
    try {
        const tx = await provider.getTransaction(txHash);
        if (tx.to !== null) return; // Only look at contract deployments

        // Extract first 4 bytes of contract bytecode
        const contractInitCode = tx.data.slice(0, 10); // First 4 bytes in hex format

        // Filter only contracts starting with 0x60806040
        if (contractInitCode === "0x60806040") {
            console.log(`🚀 New Contract Detected with Matching Method ID!`);
            console.log(`🔍 Transaction Hash: ${txHash}`);
            console.log(`🔢 First Bytes of Bytecode: ${contractInitCode}`);
        }

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
    }
});
