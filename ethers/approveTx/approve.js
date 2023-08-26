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

const receiver = "0xFAE55A213551Ca722d9D9Db79dc49E4E500E43B9"
const amount = 1000;

const start = async () => {
    const name = await tokenContract.name()
    console.log('token name: ', name)

    const approv = await tokenContract.approve(receiver, amount)
    const approve = await approv.wait()
    console.log('Tx hash: ', approve.hash)
    console.log(`approved ${amount} tokens`)
}
start()

