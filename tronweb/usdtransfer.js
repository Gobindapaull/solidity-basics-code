const TronWeb = require("tronweb")
require('dotenv').config()

// console.log(TronWeb)

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io")
const solidityNode = new HttpProvider("https://api.trongrid.io")
const eventServer = new HttpProvider("https://api.trongrid.io")
const privateKey = process.env.PRIVATE_KEY

const tronWeb = new TronWeb({
    fullNode,
    solidityNode,
    eventServer,
    privateKey
});

// console.log(tronWeb)

const USDT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
const ABI = require('./ABI.json')

const address = tronWeb.address.fromPrivateKey(process.env.PRIVATE_KEY)
console.log("Wallet Address : ",address)

// TVjNWEG95NdPet92Z37BFUYwUGnvRvrR7w


const bot = async () => {

    try {
        console.log("connected to tron rpc : ", await tronWeb.isConnected())
        const USDTContract = await tronWeb.contract(ABI, USDT)

        // Token Name
        const name = await USDTContract.name().call()
        console.log("Token Name : ",name)

        // Owner Balance
        const balance = await USDTContract.balanceOf(address).call()
        console.log("Owner USDT Balance : ", (tronWeb.toDecimal(balance/1e6)))

        // Transfer USDT
        const USDTx = await USDTContract.transfer("TAio4RNvh3sJnXkAhEtrS3Ui386YqTytR3", 1).send()
        console.log("USDT Transfer done!!",USDTx)


    } catch (error) {
        console.log('something error')
    }

}

// tronscan usdt balance check and transfer bot
// TG: @autoboy

bot()

