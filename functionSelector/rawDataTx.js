const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
console.log(`wallet address : ${wallet.address}`)

const addressHex = process.env.WALLET_ADDRESS.toLocaleLowerCase().replace("0x", "").padStart(64, "0");
console.log(`Address hex data : ${addressHex}`);

const amountHex = ethers.parseUnits(process.env.AMOUNT, 18).toString(16).padStart(64, "0");
console.log(`Amount hex data: ${amountHex}`);

const data = process.env.SELECTOR + addressHex + amountHex;
console.log(`Full raw hex data: ${data}`);

const tx = {
    to: process.env.CONTRACT_ADDRESS,
    data: data
}

const main = async () => {
    const transaction = await wallet.sendTransaction(tx);
    const receipt = await transaction.wait();
    console.log(`Transaction successful : ${receipt.hash}`);
}

main();
