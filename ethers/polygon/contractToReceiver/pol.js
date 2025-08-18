const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");
const wallet = new ethers.Wallet("", provider);

const receiver = "0x042B35C0e946ea78d81684c82AB2464a00c5564C";
const amount = ethers.parseEther("0.03");

async function sendTx() {
    const feeData = await provider.getFeeData();
    const gasLimit = 21001n;
    const gasPrice = feeData.maxPriorityFeePerGas;
    console.log(`Amount : ${amount}`);
    const tx = {
        to: receiver,
        value: amount
    };

    console.log("Sending transaction...");
    console.log(`Sending amount ${ethers.formatEther(amount)}`);
    const txResponse = await wallet.sendTransaction(tx);
    console.log("Transaction hash:", txResponse.hash);
    const receipt = await txResponse.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
}

sendTx();
