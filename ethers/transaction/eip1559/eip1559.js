const { ethers } = require("ethers");


const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");
const wallet = new ethers.Wallet("", provider);

async function sendType2Tx() {
    const tx = {
        to: "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD",
        value: ethers.parseEther("0.001"), // Sending 0.001 ETH
        type: 2, // Explicitly set EIP-1559 transaction
        maxFeePerGas: ethers.parseUnits("151", "gwei"), // Max total fee per gas
        maxPriorityFeePerGas: ethers.parseUnits("101", "gwei"), // Miner tip
        gasLimit: 21001, // Standard ETH transfer
    };

    console.log("Sending transaction...");
    const txResponse = await wallet.sendTransaction(tx);
    console.log("Transaction hash:", txResponse.hash);

    const receipt = await txResponse.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
}

sendType2Tx();
// https://polygonscan.com/tx/0x87ee1a47f2cd5166d83ee1f7ac4c2ab80c146e166fdcbe06a52e6a3a7dbd271b
