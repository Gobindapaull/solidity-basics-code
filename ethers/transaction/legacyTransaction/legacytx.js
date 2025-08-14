const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");

const privateKey = "";
const wallet = new ethers.Wallet(privateKey, provider);
const to = "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD";

async function sendLegacyTx() {

    // Transaction details
    const tx = {
        to: to,
        value: ethers.parseEther("0.001"), // sending 0.001 ETH
        gasLimit: 21001,                   // standard for simple transfer
        gasPrice: ethers.parseUnits("101", "gwei"), // legacy gas price
        type: 0 // explicitly specify Type 0
    };

    console.log("Sending legacy transaction...");
    const txResponse = await wallet.sendTransaction(tx);
    console.log("Transaction Hash:", txResponse.hash);

    const receipt = await txResponse.wait();
    console.log("Transaction Confirmed in Block:", receipt.blockNumber);
}

sendLegacyTx()

// https://polygonscan.com/tx/0xed12f8cb751b44032fdf4ba9cb8c2ced0b4c823e6011fcc40b34ca49ce638003
