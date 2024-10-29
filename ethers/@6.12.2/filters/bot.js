const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia");

const wallet = new ethers.Wallet("", provider);
console.log(wallet.address);

const WETH = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
const ABI = require("./ABI.json");

const contract = new ethers.Contract(WETH, ABI, wallet);


const bot = async () => {

   const filter = contract.filters.Transfer("0x219Ec7AD1ad6D4df8CdD733567745f0d42016B6e");
   const events = await contract.queryFilter(filter);
   console.log(events);
}

bot();
