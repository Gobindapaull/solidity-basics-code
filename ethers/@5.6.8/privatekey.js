const ethers = require('ethers')
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const walletFromPrivateKey = new ethers.Wallet("0x6c2202b77b6b6c2cdd6546e3ece91fb719518167e5d69c8075fde96dea080e77")
console.log(walletFromPrivateKey.address)
