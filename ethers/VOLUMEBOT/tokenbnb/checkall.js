const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

// Setup provider
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// Load ERC20 ABI
const erc20Abi = require("./ABI.json");
const tokenContract = new ethers.Contract(process.env.TOKEN_ADDRESS, erc20Abi, provider);

// Read addresses from wallet.txt (format: address | privateKeyOrTxHash)
const lines = fs.readFileSync("wallet.txt", "utf8").trim().split("\n");
const addresses = lines.map(line => line.split("|")[0].trim());

async function checkAllBalances() {
    for (const address of addresses) {
        try {
            const bnbBalance = await provider.getBalance(address);
            const tokenBalance = await tokenContract.balanceOf(address);

            console.log(`\n📍 Address: ${address}`);
            console.log(`  💰 BNB: ${ethers.formatEther(bnbBalance)} BNB`);
            console.log(`  🪙 Token: ${ethers.formatUnits(tokenBalance, 18)} tokens`);
        } catch (err) {
            console.error(`❌ Error checking balances for ${address}:`, err.message);
        }
    }
}

checkAllBalances();
