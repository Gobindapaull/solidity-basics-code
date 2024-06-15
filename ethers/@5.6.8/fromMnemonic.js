const ethers = require("ethers")
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const bot = async () => {
    const phrase = "symbol scrap potato rapid amateur toast verify blind exile employ denial penalty"
    const fromPhrasee = new ethers.Wallet.fromMnemonic(phrase)

    console.log(fromPhrasee.address)
    console.log(fromPhrasee.privateKey)

    const walletBalance = await provider.getBalance(fromPhrasee.address)
    console.log(ethers.utils.formatEther(walletBalance))
}

bot()
