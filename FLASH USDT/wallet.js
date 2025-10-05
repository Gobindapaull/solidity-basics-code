import {ethers} from "ethers";
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

console.log(`wallet address: ${wallet.address}`);

const main = async () => {
    const bal = await provider.getBalance(wallet.address);
    console.log(`wallet balance : ${ethers.formatEther(bal)} ETH`);
}

main();
