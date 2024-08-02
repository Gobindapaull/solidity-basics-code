const ethers = require("ethers")
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth")
const provider2 = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const hexString = Array(64)
    .fill()
    .map(() => Math.round(Math.random()))
    .join('');


console.log(hexString.length)

const randomBigInt = (`0x${hexString}`);
console.log(randomBigInt)

const wallet = new ethers.Wallet(randomBigInt)
console.log(wallet.address)

const ETH = async () => {
    const balance = await provider.getBalance(wallet.address)
    console.log(`${ethers.formatEther(balance)} ETH`)
}

ETH()

const BNB = async () => {
    const balance = await provider2.getBalance(wallet.address)
    console.log(`${ethers.formatEther(balance)} BNB`)
}

BNB()
