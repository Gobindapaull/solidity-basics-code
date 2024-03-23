const ethers = require('ethers')
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const walletRandom = ethers.Wallet.createRandom()
console.log(walletRandom.address)
console.log(walletRandom.privateKey)
