const ethers = require('ethers')
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const from = '0x21d39B53A83626Ac57f60CBecd9Ca830E29b8B16'
const to = '0x020F839AD2B18f2A5b3C88905bd4C59daf5715b2'

const bot = async () => {
    const bal = await provider.getBalance(from)
    const balance = ethers.formatEther(bal)
    console.log(`Balance : ${balance} BNB`)
}

bot()
