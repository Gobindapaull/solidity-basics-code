const ethers = require('ethers')

const privateKey = "0xbd182287473163bf8dd8e014b8118fa93f5a478924e205ad5090ab9871098734"

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth")
const wallet = new ethers.Wallet(privateKey, provider)
const account = wallet.connect(provider)



console.log(`
    New pair 
    =================
    account: ${account.address}
    wallet: ${wallet.address}
  `);
