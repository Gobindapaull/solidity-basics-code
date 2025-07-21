const ethers = require("ethers");
require("dotenv").config();

const ABI = require("./build/Lottery.json");
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, ABI, wallet);

async function Winner() {

    // 1. View players
    const players = await contract.getPlayers();
    console.log(`Players: ${players} \n`);

    // 2. Pick winner
    const winner = await contract.pickWinner();
    await winner.wait();
    console.log(`Winer picked and lottery reset`);

}

Winner();
