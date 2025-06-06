const { ethers } = require("ethers");
const fs = require("fs");

function generateWallets(count) {
    const wallets = [];
    for (let i = 0; i < count; i++) {
        const wallet = ethers.Wallet.createRandom();
        wallets.push(wallet.address);
    }
    return wallets;
}

const wallets = generateWallets(1000);

// Save to file in formatted array style
const formatted = JSON.stringify(wallets, null, 2); // Pretty print
fs.writeFileSync("wallets.json", formatted);

console.log("✅ Wallets saved to wallets.json");
