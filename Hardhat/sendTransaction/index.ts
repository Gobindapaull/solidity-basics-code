import { ethers } from "ethers";

const main = async () => {
    const url = "http://127.0.0.1:8545";
    const provider = new ethers.JsonRpcProvider(url);
    const signer = await provider.getSigner();

    const tx = await signer.sendTransaction({
        to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        value: ethers.parseEther("999")
    });

    const receipt = await tx.wait();
    console.log(receipt);

    const balance = await provider.getBalance(signer.address);
    const formattedBalance = ethers.formatEther(balance);
    console.log(`Wallet balance : ${formattedBalance}`);
}

main();
