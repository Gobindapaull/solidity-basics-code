//  "ethers": "^6.13.1"

const ethers = require("ethers")
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const bot = async () => {
    const wallet =  ethers.Wallet.fromPhrase("")

    console.log(`wallet address : ${wallet.address}`)

    // balance 
    const balance = await provider.getBalance(wallet)
    console.log(`balance : ${ethers.formatEther(balance)} ETH`)

}

bot()
