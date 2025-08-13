const { ethers } = require("ethers");
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log(`wallet address: ${wallet.address}`);

provider.on("block", async (e) => {
    console.log(`block: ${e}`);

    const tokenAddress = process.env.TOKEN_ADDRESS;
    const ERC20_ABI = [
        "function balanceOf(address) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
        "function transfer(address to, uint256 amount) returns (bool)"
    ];

    const recipient = process.env.RECEIVER_ADDRESS;
    const amount = process.env.AMOUNT;

    const token = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);

    const [decimals, symbol, balance] = await Promise.all([
        token.decimals(),
        token.symbol(),
        token.balanceOf(wallet.address),
    ]);

    console.log(`Token ${symbol} has ${decimals} decimals.`);
    console.log(`My balance is: ${ethers.formatUnits(balance, decimals)} ${symbol}`);

    // Parse amount from .env
    const parsedAmount = ethers.parseUnits(process.env.AMOUNT, decimals);

    // Balance check
    if (balance < parsedAmount) {
        console.error("❌ Insufficient token balance.");
        return;
    }
    const tx = await token.transfer(recipient, balance, {
        gasLimit: 100000,
        maxFeePerGas: ethers.parseUnits("101", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("31", "gwei")
    });
    console.log("Transaction Hash:", tx.hash);

    await tx.wait();
    console.log("Transfer confirmed!");

})

// https://polygonscan.com/tx/0xfca13e041e1789e1942699f38f8dcc96180eb1ec71986cf8cd60a46a29168f6e
