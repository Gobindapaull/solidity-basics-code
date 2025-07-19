const ethers = require("ethers");
require("dotenv").config();

const ABI = require("./build/EventLogger.json");
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, ABI, wallet);

async function LogMessage() {
    const tx = await contract.logMessage("hello from day 5!");
    await tx.wait();
    console.log(`tx success: ${tx.hash}`);

}

LogMessage();

// https://testnet.bscscan.com/tx/0x2fbdb28b3ccba0d31d9ce4489322429d18c138f2b1966e652789d64d3b91cf80
