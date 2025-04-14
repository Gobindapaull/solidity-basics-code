const ethers  = require("ethers");
const fs = require("fs")
require("dotenv").config();

// BSC Testnet setup
const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Replace with your deployed token contract address
const tokenAddress = process.env.TOKEN_ADDRESS;
const routerAddress = process.env.ROUTER_ADDRESS; // PancakeSwap V2 testnet router

// ABIs
const tokenABI = JSON.parse(fs.readFileSync("./build/Token_sol_Token.abi", "utf8"));

const routerAbi = require("./RouterABI.json");

async function addLiquidity() {
  const token = new ethers.Contract(tokenAddress, tokenABI, wallet);
  const router = new ethers.Contract(routerAddress, routerAbi, wallet);

  const tokenAmount = ethers.parseUnits("1000000000", 18); // 1 Billion tokens
  const ethAmount = ethers.parseEther("0.001"); // 0.001 ETH

  const tokenAmountMin = (tokenAmount * 95n) / 100n;
  const ethAmountMin = (ethAmount * 95n) / 100n;

  const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

  // Approve tokens to router
  const approveTx = await token.approve(routerAddress, tokenAmount);
  await approveTx.wait();
  console.log("✅ Token approved for router.");

  // Add liquidity
  try {
    const tx = await router.addLiquidityETH(
      tokenAddress,
      tokenAmount,
      tokenAmountMin,
      ethAmountMin,
      wallet.address,
      deadline,
      { value: ethAmount }
    );

    // Wait for transaction to be mined and get the receipt
    const receipt = await tx.wait();
    console.log("Transaction Receipt:", receipt);
    console.log(`Track your transaction here: https://testnet.bscscan.com/tx/${receipt.hash}`);
  } catch (error) {
    console.error("Error adding liquidity:", error);
  }
}

addLiquidity();
