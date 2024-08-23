import { ethers } from "ethers"
import  dexAbi  from "../abi/dexAbi.json"
import { balloonAbi } from "./abi/balloonAbi.js"
import "dotenv/config"

const ethToTokenSig = "0x7ff36ab5"
const tokenToEthSig = "0x18cbafe5"
const dexAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"
const balloonAddress = ""
const myMnemonic = "ridge often harbor vicious man excite rubber soccer program spoon frog bullet"

const wallet = ethers.Wallet.fromPhrase(myMnemonic)

const signer = wallet
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const dexContract = new ethers.Contract(
    dexAddress,
    dexAbi,
    signer
)

const balloonContract = new ethers.Contract(
    balloonAddress,
    balloonAbi,
    signer
)

provider.on("pending", async (tx) => {
    const txInfo = await provider.getTransaction(tx)

    if (txInfo != null) {
        if (txInfo.to == dexAddress && txInfo.from != signer.address) {
            console.log("TRANSACTION FOUND :)")

            if (txInfo.data.slice(0, 10) == ethToTokenSig || txInfo.data.slice(0, 10) == tokenToEthSig) {
                console.log(txInfo)

                const maxFee = ethers.formatEther(txInfo.maxFeePerGas) * 10 ** 18
                console.log(`max Fee : ${maxFee}`)
                const maxPriorityFee = ethers.formatEther(txInfo.maxPriorityFeePerGas) * 10 ** 18
                console.log(`max priority fee : ${maxPriorityFee}`)

                const tokenBought = await dexContract.price(

                )
                // 0x7ff36ab5
                const txOne = await dexContract.swapExactETHForTokens({
                    // parameters
                    value: txInfo.value,
                    maxPriorityFee: maxFee,
                    maxPriorityFeePerGas: maxPriorityFee
                })
                console.log(`Transaction one : ${txOne}`)

                // 0x18cbafe5
                const txTwo = await dexContract.swapExactTokensForETH({
                    // parameters
                    value: txInfo.value,
                    maxPriorityFee: maxFee,
                    maxPriorityFeePerGas: maxPriorityFee
                })
                console.log(`Transaction two : ${txTwo}`)

            }
        }
    }
})
