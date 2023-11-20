const ethers = require('ethers')
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")


const wallet = async () => {
    const wallet = ethers.Wallet.createRandom()
    console.log(wallet.address)
    console.log(wallet.privateKey)
}

wallet()
