const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

// Setup provider and wallet
const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Token contract
const tokenAddress = process.env.TOKEN_ADDRESS;
const tokenAbi = JSON.parse(fs.readFileSync("./build/Token_sol_Token.abi", "utf8"));
const token = new ethers.Contract(tokenAddress, tokenAbi, wallet);

async function checkBalance() {
  const balance = await token.balanceOf(wallet.address);
  const humanReadable = ethers.formatUnits(balance, 18);
  console.log(`📦 Token Balance: ${humanReadable}`);
}

checkBalance();
