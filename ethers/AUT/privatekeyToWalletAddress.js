const ethers = require('ethers')
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth")

const walletFromPrivateKey = new ethers.Wallet("1554e7851e857dd19a43dd06cb")
console.log(walletFromPrivateKey.address)
