const { ethers } = require("ethers");

function generateWallets(count) {
    const wallets = [];
    for (let i = 0; i < count; i++) {
        const wallet = ethers.Wallet.createRandom();
        wallets.push(wallet.address);
    }
    return wallets;
}

const wallets = generateWallets(50);
console.log(wallets);
