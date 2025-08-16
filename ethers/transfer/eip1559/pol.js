const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");
const wallet = new ethers.Wallet("", provider);

async function sendType2Tx() {
    const feeData = await provider.getFeeData();
    const gasLimit = 21001n;
    const gasPrice = feeData.maxPriorityFeePerGas * 4n;
    const balance = await provider.getBalance(wallet.address);
    const safetyMargin = ethers.parseUnits("0.000001", "ether"); // 0.000001 MATIC
    const amount = balance - (gasLimit * gasPrice) - safetyMargin;
    console.log(`Amount : ${amount}`);
    const tx = {
        to: "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD",
        value: amount,
        type: 2, // Explicitly set EIP-1559 transaction
        maxFeePerGas: feeData.maxFeePerGas * 4n, // Max total fee per gas
        maxPriorityFeePerGas: gasPrice, // Miner tip
        gasLimit: gasLimit, // Standard ETH transfer
    };

    console.log("Sending transaction...");
    console.log(`Sending amount ${ethers.formatEther(amount)}`);
    const txResponse = await wallet.sendTransaction(tx);
    console.log("Transaction hash:", txResponse.hash);

    const receipt = await txResponse.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
}

sendType2Tx();
