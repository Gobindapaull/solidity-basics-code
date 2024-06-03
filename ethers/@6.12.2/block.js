const ethers = require("ethers")
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const bot = async () => {
    provider.on("block", (e) => {
        console.log(`block : ${e}`)
    })
}

bot()
