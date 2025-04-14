const ethers = require("ethers")
require("dotenv").config();

const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")

const balance = async () => {
    const privateKey = new ethers.Wallet(process.env.PRIVATE_KEY)
    console.log(`wallet address: ${privateKey.address}`)

    const balance = await provider.getBalance(privateKey.address);
    const balance_eth = ethers.formatEther(balance);
    console.log(`ETH balance : ${balance_eth} ETH`);
}

balance();
