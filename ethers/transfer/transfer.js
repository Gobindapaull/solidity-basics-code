require('dotenv').config()
const ethers = require('ethers')

const ABI = require('./abi.json')

const privateKey = process.env.PRIVATE_KEY
const url = process.env.URL
const tokenAddress = process.env.tokenAddress

const provider = new ethers.JsonRpcProvider(url)
const wallet = new ethers.Wallet(privateKey)
const signer = wallet.connect(provider)
const tokenContract = new ethers.Contract(tokenAddress, ABI, signer)

const receiver = ethers.Wallet.createRandom().address
const amount = 1000000000000000000000n;

const start = async () => {
    const name = await tokenContract.name()
    console.log('token name: ', name)

    for ( let i = 0; i < 20; i++) {
        const transfe = await tokenContract.transfer(receiver, amount)
        const transfer = await transfe.wait()
        console.log('Tx hash: ', transfer.hash)
        console.log(`transfer ${amount} tokens`)
    }

}
start()

