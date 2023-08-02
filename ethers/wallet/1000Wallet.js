const ethers = require('ethers')
const fs = require('fs/promises')
require('dotenv').config()

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)

const generate1000Wallet = async () => {
    let i = 0
    while ( i < 1000) {
        const walletRandom = ethers.Wallet.createRandom()
        console.log(walletRandom.address)
        fs.appendFile('wallet.txt', `${walletRandom.address}\n`)
        i++
    }
}

generate1000Wallet()
