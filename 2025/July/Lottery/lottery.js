const ethers = require("ethers");
require("dotenv").config();

const ABI = require("./build/Lottery.json");
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, ABI, wallet);

async function Winner() {
    // 1. Enter Lottery
    const enter = await contract.enter({
        value: ethers.parseEther("0.01")
    });
    await enter.wait();
    console.log(`Entered the lottery`);

    // 2. View players
    const players = await contract.getPlayers();
    console.log(`Players: ${players}`);

    // 3. Pick winner
    const winner = await contract.pickWinner();
    await winner.wait();
    console.log(`Winer picked and lottery reset`);

}

Winner();
// https://testnet.bscscan.com/address/0x9D79983c7aF51Df9346645953A5e56B8C5Bd5ad8
