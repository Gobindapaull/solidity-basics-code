// "ethers": "6.7.1"

import { ethers } from "ethers"
import ABI from "./ABI.json"

console.log(`ethers.js version: ${ethers.version}` + "\n")

const url = "https://rpc.ankr.com/eth"
const walletAddress = "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD"
const contractAddress = "0xDe99DdF192483147056dcc0023dAA273b2e44e07"

const provider = new ethers.JsonRpcProvider(url)
const contract = new ethers.Contract(contractAddress, ABI, provider)


const blockInfo = async () => {
    const blockNumber = await provider.getBlockNumber()
    console.log(`Block Number : ${blockNumber}` + "\n")
}

const eventListen = async () => {
    await blockInfo()
    contract.on("Swap", (sender, amount0In, amount1IN, amount0OUt, amount1Out, to) => {
        console.log(sender, amount0In, amount1IN, amount1IN, amount1Out, to)
        amount0In > 0 ? console.log(`sold : ${amount1Out} tokens`) : console.log(`bought : ${ethers.formatEther(amount1IN)} ETH`)
    })
}
const bot = async () => {

    await eventListen()

}

bot()
