const ethers = require("ethers");
require("dotenv").config();

async function sellUSDT() {

    // Create provider and wallet
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // ERC20 Token ABI
    const erc20Abi = require("./USDTABI.json");

    // DEX ABI
    const dexAbi = require("./RouterABI.json");

    // Create contract instances
    const tokenContract = new ethers.Contract(process.env.USDT_ADDRESS, erc20Abi, wallet);
    const dexContract = new ethers.Contract(process.env.PC_ROUTER_ADDRESS, dexAbi, wallet);
    try {
        console.log("🚀 Starting USDT token sell process...");

        // Check token balance
        const balance = await tokenContract.balanceOf(wallet.address);
        console.log(`💰 Current USDT Balance: ${ethers.formatUnits(balance, 18)} tokens`);

        // Approve the DEX to spend the tokens
        // console.log("📝 Approving tokens...");
        // const approveTx = await tokenContract.approve(process.env.PC_ROUTER_ADDRESS, balance);
        // await approveTx.wait();
        // console.log("✅ Tokens approved for sale!");

        // Prepare the swap path (Token -> WBNB)
        const path = [process.env.USDT_ADDRESS, process.env.WBNB_ADDRESS];

        // Execute the swap
        const amountOutMin = 0; // ⚠️ You may want to set this based on slippage
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

        console.log("🔄 Executing token swap...");
        const swapTx = await dexContract.swapExactTokensForETH(
            balance,
            amountOutMin,
            path,
            process.env.RECEIVER_ADDRESS,
            deadline
        );

        const tx = await swapTx.wait();
        console.log("🎉 Tokens sold successfully!");
        console.log(`🔗 Tx hash: https://bscscan.com/tx/${tx.hash}`);
    } catch (error) {
        console.error("❌ Error selling tokens:", error);
    }
}

sellUSDT();
