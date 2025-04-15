const ethers  = require("ethers");
const fs = require("fs")
require("dotenv").config()

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
console.log(`wallet address : ${wallet.address}`)

const tokenAddress = process.env.CONTRACT_ADDRESS;

const ABI = JSON.parse(fs.readFileSync("./build/Contract_sol_Contract.abi", "utf-8"));

const fetchData = async () => {
  const contract = new ethers.Contract(tokenAddress, ABI, wallet);

  const owner = await contract.owner();
  const amount = await contract.amount();

  console.log("Owner Name:", owner);
  console.log("Amount:", ethers.formatEther(amount));
}

fetchData();
