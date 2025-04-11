const TronWeb = require("tronweb")
require("dotenv").config()

const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io",
    privateKey: process.env.PRIVATE_KEY
})

const usdt_contract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
const ABI = require('./ABI.json')

const getUSDTBalance = async () => {
    try {
        // Latest Block
        const block = await tronWeb.trx.getCurrentBlock()
        console.log(`Current Block : ${block.block_header.raw_data.number}`)

        // Wallet address
        const walletAddress = tronWeb.defaultAddress.base58
        console.log(`Wallet address : ${walletAddress}`)

        const contract = await tronWeb.contract().at(usdt_contract)
        const balance = await contract.balanceOf(walletAddress).call()
        const usdtBalance = tronWeb.toBigNumber(balance._hex).toNumber() / 1e6
        console.log(`Balance : ${usdtBalance} USDT`)

        console.log("connected to tron rpc : ", await tronWeb.isConnected())

        // Transfer USDT
        const USDTx = await contract.transfer("TNurqKNBiGB2nZ48YDvgKcr3bj2PEPuzGF", 35 * 1e6).send()
        console.log("USDT Transfer done!!",USDTx)

    } catch (error) {
        console.log("Error fetching USDT balance")
    }

}

getUSDTBalance()

// "dependencies": {
//     "dotenv": "^16.5.0",
//     "tronweb": "^5.3.3"
//   }
