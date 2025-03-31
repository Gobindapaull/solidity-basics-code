const ethers = require("ethers") // "ethers": "^6.13.5"

const wallet =  ethers.Wallet.createRandom();
console.log(wallet.address);

const bot = async () => {
    const msg = "gasless transaction message"
    const message = ethers.solidityPackedKeccak256(["address", "string"], [wallet.address, msg])
    const signature = await wallet.signMessage(ethers.getBytes(message))
    console.log(`signature : ${signature}`)
}
bot();
