const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

// Provider and Wallet
const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Addresses
const tokenAddress = process.env.TOKEN_ADDRESS; // your token address
const routerAddress = process.env.ROUTER_ADDRESS; // PancakeSwap V2 Router on BSC testnet
const WBNB = process.env.WBNB_ADDRESS; // BSC Testnet WBNB

// ABIs
const routerAbi = require("./RouterABI.json");
const router = new ethers.Contract(routerAddress, routerAbi, wallet);

async function swapBNBForTokens() {
  const ethAmount = ethers.parseEther("0.00001"); // Amount of BNB to swap
  const amountOutMin = 0; // Minimum tokens to receive (set to 0 for demo, change in production!)
  const path = [WBNB, tokenAddress];
  const to = wallet.address;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

  const tx = await router.swapExactETHForTokens(
    amountOutMin,
    path,
    to,
    deadline,
    { value: ethAmount }
  );

  const receipt = await tx.wait();
  console.log(`✅ Swap successful! TX Hash: ${receipt.hash}`);
  console.log(`View: https://testnet.bscscan.com/tx/${receipt.hash}`);
}

swapBNBForTokens();
