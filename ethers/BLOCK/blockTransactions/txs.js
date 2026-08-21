const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// STEP 1: Listen for new Ethereum blocks
provider.on("block", async (blockNumber) => {
    try {
        // STEP 2: Print separator
        console.log("\n" + "=".repeat(70));

        // STEP 3: Print block number
        console.log(`New block: ${blockNumber}`);

        // STEP 4: Get the block
        const block = await provider.getBlock(blockNumber);

        if (!block) {
            console.log("Block not found");
            return;
        }

        // STEP 5: Print transaction count
        console.log(`Transactions: ${block.transactions.length}`);

        // STEP 6: Fetch all transactions concurrently
        const transactions = await Promise.all(
            block.transactions.map((txHash) =>
                provider.getTransaction(txHash)
            )
        );

        // STEP 7: Process each transaction
        for (const tx of transactions) {

            if (!tx) {
                continue;
            }

            // STEP 8: Convert transaction value from Wei to ETH
            const value = ethers.formatEther(tx.value);

            // STEP 9: Display transaction details
            console.log(
                `TX: ${tx.hash} | ` +
                `From: ${tx.from} | ` +
                `To: ${tx.to} | ` +
                `Value: ${value} ETH`
            );
        }

        // STEP 10: End separator
        console.log("=".repeat(70));

    } catch (error) {

        // STEP 11: Handle errors
        console.error("Block processing error:", error.message);
    }
});
