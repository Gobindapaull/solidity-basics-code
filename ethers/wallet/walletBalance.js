const ethers = require('ethers')
require('dotenv').config()

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)

const walletBalance = async () => {
    const walletRandom = ethers.Wallet.createRandom()
    const bal = await provider.getBalance(walletRandom.address) // in wei
    const balance = ethers.formatEther(bal) // in eth
    
    console.log("Wallet Balance: ", `${walletRandom.address}    ${balance} ETH`)
}

walletBalance()
