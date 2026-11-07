require('dotenv').config()
const ethers = require('ethers')

const ABI = require('./abi.json')

const privateKey = process.env.PRIVATE_KEY
const url = process.env.URL
const tokenAddress = process.env.TOKEN_ADDRESS
const spender = process.env.SPENDER_ADDRESS
const amount = process.env.AMOUNT

const provider = new ethers.JsonRpcProvider(url)
const signer = new ethers.Wallet(privateKey, provider)
const tokenContract = new ethers.Contract(tokenAddress, ABI, signer)


const start = async () => {
    try {
        const name = await tokenContract.name()
        const decimals = await tokenContract.decimals()

        console.log('Token name:', name)

        const parsedAmount = ethers.parseUnits(amount, decimals)

        const tx = await tokenContract.approve(spender, parsedAmount)

        console.log('Transaction sent:', tx.hash)

        const receipt = await tx.wait()

        console.log('Transaction confirmed:', receipt.hash)
        console.log(`Approved ${amount} ${name} tokens`)
    } catch (error) {
        console.error('Error:', error.shortMessage || error.message)
    }
}
start()



// approve BEP20 tokens transaction script
// telegram: @autoboyt
