const ethers = require('ethers')
require('dotenv').config()
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/")

const privateKey = "0x394d1f946f7db234c04949266a80e79caebfc68a306aefd3de44cfee6819a4ba"
const toAddress = "0x000000000000000000000000000000000000dEaD"

const transaction = async () => {

    const wallet = new ethers.Wallet(privateKey, provider)

    const txObj = {
        to: toAddress,
        value: ethers.parseEther("0.00001")
    }

    const tx = await wallet.sendTransaction(txObj)
    await tx.wait()
    console.log('TX : ', tx.hash)
}

transaction()

// hash: 0xed94f958a38aa39e06d81fd25299fbc9612bcef994124313174105b774f15b91
