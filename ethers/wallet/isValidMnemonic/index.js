
const ethers = require("ethers")
const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com")

const phrase = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"


const bot = async () => {

    console.log(ethers.Mnemonic.isValidMnemonic(phrase))

    const wallet =  ethers.Wallet.fromPhrase(phrase);

    console.log(`wallet address : ${wallet.address}`)
    console.log(`Key phrase: ${wallet.mnemonic.phrase}`);

    // balance 
    const balance = await provider.getBalance(wallet)
    console.log(`balance : ${ethers.formatEther(balance)} ETH`)

}

bot()

// "ethers": "^6.13.5",
