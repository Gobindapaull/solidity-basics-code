// "ethers": "6.7.1"

import { ethers } from "ethers"
import fs from 'fs'
import ABI from "./ABI.json"

console.log(`ethers.js version: ${ethers.version}` + "\n")

const url = "https://rpc.ankr.com/eth"
const walletAddress = ""
const contractAddress = ""

const provider = new ethers.JsonRpcProvider(url)
const contract = new ethers.Contract(contractAddress, ABI, provider)


const blockInfo = async () => {
    const blockNumber = await provider.getBlockNumber()
    console.log(`Block Number : ${blockNumber}` + "\n")
}

const walletInfo = async () => {
    const balance = await provider.getBalance(walletAddress)
    console.log(`Wallet balance : ${ethers.formatEther(balance)} ETH`)
    
    const nonce = await provider.getTransactionCount(walletAddress)
    console.log(`Nonce : ${nonce}`+ "\n")
}

const randomWallet = () => {
    const randomWallet = ethers.Wallet.createRandom(provider)
    console.log(`Wallet address : ${randomWallet.address}`)
    console.log(`Private key : ${randomWallet.privateKey}` + "\n")
}

const walletFetch =  async () => {
    for (let index = 0; index < 1; index++) {
        const wallet1 = ethers.Wallet.createRandom(provider)
        fs.writeFileSync("wallet.json", JSON.stringify(wallet1))
    }
}
// walletFetch()

const eventListen = async () => {
    contract.on("Swap", (sender, amount0In, amount1IN, amount0OUt, amount1Out, to) => {
        console.log(sender, amount0In, amount1IN, amount1IN, amount1Out, to)
        amount0In > 0 ? console.log(`sell : ${amount1Out} tokens`) : console.log(`buy`)
    })
}
const bot = async () => {

    await blockInfo()
    await walletInfo()
    randomWallet()
   await eventListen()

}

bot()
