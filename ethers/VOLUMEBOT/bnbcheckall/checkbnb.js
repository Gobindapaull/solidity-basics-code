const ethers = require('ethers');
const fs = require('fs');
require('dotenv').config();

// Setup provider
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// Read addresses from wallet.txt
const lines = fs.readFileSync('wallet.txt', 'utf8').trim().split('\n');

// Extract only wallet addresses (before the pipe | symbol)
const addresses = lines.map(line => line.split('|')[0].trim());

async function checkBalances() {
    for (const address of addresses) {
        try {
            const balance = await provider.getBalance(address);
            console.log(`${address} => ${ethers.formatEther(balance)} BNB`);
        } catch (err) {
            console.error(`Error fetching balance for ${address}:`, err.message);
        }
    }
}

checkBalances();
