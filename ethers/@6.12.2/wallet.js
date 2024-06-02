// "ethers": "^6.12.2"

const ethers = require("ethers")
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth")
// paul
const bot = async () => {
    const key = "0x0000000000000000000000000000000000000000000000000000000000ababab"
    console.log(`private key length: ${key.length}`)

    const wallet = new ethers.Wallet(key)
    console.log(`wallet address : ${wallet.address}`)

    // balance 
    const balance = await provider.getBalance(wallet)
    console.log(`balance : ${ethers.formatEther(balance)} ETH`)

    // private key length: 66
    // wallet address : 0x58F0502B379BfFbd302963994e43dD165344AAa1
    // balance : 0.0 ETH
}

bot()
