const ethers = require('ethers')
require('dotenv').config()

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)

const Provider = async () => {

    // BLOCK NUMBER
    const blockNumber = await provider.getBlockNumber()
    console.log("blockNumber: ", blockNumber)

    // NONCE
    const getTransactionCount = await provider.getTransactionCount("0x8874174A2366668d54fEa6343F71709389563c8a")
    console.log("getTransactionCount: ", getTransactionCount)

    // BALANCE
    const bal = await provider.getBalance("0x8874174A2366668d54fEa6343F71709389563c8a")
    const balance = ethers.formatEther(bal)
    console.log("balance : ", `${balance} ETH`)

}

Provider()
