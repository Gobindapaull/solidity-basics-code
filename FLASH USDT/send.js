import {ethers} from "ethers";
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

async function sendTx() {
    const feeData = await provider.getFeeData();
    const gasLimit = 21001n;
    const gasPrice = feeData.maxPriorityFeePerGas * 4n;
    const amount = ethers.parseEther("999");
    console.log(`Amount : ${ethers.formatEther(amount)} ETH`);
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
    console.log("Transaction Successful");
}

sendTx();
