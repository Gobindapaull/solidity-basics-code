require("dotenv").config();
const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

provider.on("block", async (blockNumber) => {
    console.log("\n" + "=".repeat(60));
    console.log(`New block : ${blockNumber}`);

    const block = await provider.getBlock(blockNumber);
    console.log(`Transactions: ${block.transactions.length}`);
    console.log("=".repeat(60) + "\n");
})
