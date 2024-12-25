import { ethers } from "ethers";

async function main() {
    try {
        const url = "http://127.0.0.1:8545/";
        const provider = new ethers.JsonRpcProvider(url);
        const signer = await provider.getSigner();
        const balance = await provider.getBalance(signer.address);
        const formattedBalance = ethers.formatEther(balance);
        console.log(`Wallet balance : ${formattedBalance} ETH`);
        console.log(`Wallet address : ${signer.address}`);
    } catch (error) {
        console.log(error);
    }
}

main();
