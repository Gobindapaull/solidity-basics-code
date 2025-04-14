const ethers = require("ethers");
require("dotenv").config();
const fs = require("fs");

// Provider and wallet setup
const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Token contract
const tokenAddress = process.env.TOKEN_ADDRESS;
const tokenAbi = JSON.parse(fs.readFileSync("./build/Token_sol_Token.abi", "utf8"));
const token = new ethers.Contract(tokenAddress, tokenAbi, wallet);

// Replace this with the recipient address
const recipient = process.env.RECIPIENT_ADDRESS;

// How many tokens to send (as a string)
const amountToSend = process.env.AMOUNT; // sending 1000000 tokens

async function transferToken() {
  const amount = ethers.parseUnits(amountToSend, 18); // adjust decimals if different
  const tx = await token.transfer(recipient, amount);
  const receipt = await tx.wait();

  console.log(`✅ Transferred ${amountToSend} tokens to ${recipient}`);
  console.log(`🔗 TX: https://testnet.bscscan.com/tx/${receipt.hash}`);
}

transferToken();

// https://testnet.bscscan.com/tx/0xbef852db730cf61f3ca3fda414c9d17875ea2061595305b93d4fd608cefcacf3
