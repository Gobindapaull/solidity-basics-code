const ethers = require('ethers')
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth")

const walletFromPrivateKey = new ethers.Wallet("", provider);
console.log(walletFromPrivateKey.address)
