// "ethers": "^6.13.5"
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/");

async function analyzeCurrentBlock() {
  const blockNumber = await provider.getBlockNumber();
  console.log("🔢 Current block:", blockNumber);

  // Step 1: Get block hash from block number
  const block = await provider.getBlock(blockNumber);
  console.log(`⛓️  Block hash: ${block.hash}`);

  // Step 2: Get transaction hashes from block
  const txHashes = block.transactions;
  console.log(`📦 ${txHashes.length} transactions`);

  // Step 3: Fetch full transaction details
  for (const hash of txHashes) {
    const tx = await provider.getTransaction(hash);
    console.log("-------------");
    console.log("Hash:     ", tx.hash);
    console.log("From:     ", tx.from);
    console.log("To:       ", tx.to);
    console.log("Value:    ", ethers.formatEther(tx.value), "ETH");
    console.log("Gas Price:", ethers.formatUnits(tx.gasPrice, "gwei"), "gwei");
    console.log("Nonce:    ", tx.nonce);
  }
}

// Fetches full block with all transactions
// Prints key details like value, sender, receiver, gas, etc.

// Telegram: @autoboyt

analyzeCurrentBlock();
