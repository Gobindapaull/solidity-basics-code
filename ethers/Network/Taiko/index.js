const ethers = require("ethers")
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/taiko")

const bot = async () => {
    provider.on("block", (e) => {
        console.log(`Taiko latest block number : ${e}`)
    })
}

bot()


// RPC URL, chainID AND Explorer URL

// https://rpc.ankr.com/taiko
// 167000
// ETH
// https://taikoscan.io/
