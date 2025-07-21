const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const ABI = require("./build/Lottery.json");

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, provider);

async function FetchData() {
    const players = await contract.getPlayers();
    console.log(`Total players: ${players.length}`);
}

FetchData();
