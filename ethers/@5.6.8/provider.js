const ethers = require('ethers')
// npm i ethers@5.6.8

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/18...9")
console.log(provider._isProvider)
