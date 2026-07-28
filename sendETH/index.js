const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function sendETH() {
    const tx = {
        to: process.env.RECEIVER_WALLET,
        value: ethers.parseEther("0.00001"),
        gasLimit: 21001,
        gasPrice: ethers.parseUnits("1", "gwei")
    }
    
    const transaction = await wallet.sendTransaction(tx);
    console.log(`Transaction hash: ${transaction.hash}`);

    const receipt = await transaction.wait();
    console.log(`Confirmed block: ${receipt.blockNumber}`);
}

sendETH();
