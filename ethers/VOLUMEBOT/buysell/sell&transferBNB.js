const ethers = require("ethers");
require("dotenv").config();


async function sellTokens() {
    // Create provider and wallet
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_BNB, provider);

    // ERC20 Token ABI
    const erc20Abi = require("./ABI.json");

    // DEX ABI
    const dexAbi = require("./RouterABI.json");

    // Create contract instances
    const tokenContract = new ethers.Contract(process.env.TOKEN_ADDRESS, erc20Abi, wallet);
    const dexContract = new ethers.Contract(process.env.PC_ROUTER_ADDRESS, dexAbi, wallet);
    try {
        console.log("🚀 Starting token sell process...");

        // Check token balance
        const balance = await tokenContract.balanceOf(wallet.address);
        console.log(`💰 Current Token Balance: ${ethers.formatUnits(balance, 18)} tokens`);

        // Approve the DEX to spend the tokens
        console.log("📝 Approving tokens...");
        const approveTx = await tokenContract.approve(process.env.PC_ROUTER_ADDRESS, balance);
        await approveTx.wait();
        console.log("✅ Tokens approved for sale!");

        // Prepare the swap path (Token -> WBNB)
        const path = [process.env.TOKEN_ADDRESS, process.env.USDT_ADDRESS];

        // Execute the swap
        const amountOutMin = 0; // ⚠️ You may want to set this based on slippage
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

        console.log("🔄 Executing token swap...");
        const swapTx = await dexContract.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            balance,
            amountOutMin,
            path,
            process.env.RECEIVER_ADDRESS,
            deadline
        );

        const tx = await swapTx.wait();
        console.log("🎉 Tokens sold successfully!");
        console.log(`🔗 Tx hash: https://bscscan.com/tx/${tx.hash}`);

        // Send remaining bnb to the main wallet
        const receiver = process.env.MAIN_WALLET;

        const bal = await provider.getBalance(wallet.address); // returns bigint
        console.log('BNB balance:', ethers.formatEther(bal));

        const gasPrice2 = (await provider.getFeeData()).gasPrice; // bigint
        const gasLimit2 = 21000n;
        const gasCost2 = gasPrice2 * gasLimit2;

        const valueToSend2 = bal - gasCost2;

        if (valueToSend2 <= 0n) {
            console.error("Not enough BNB to cover gas fees.");
            return;
        }

        const tx2 = {
            to: receiver,
            value: valueToSend2,
            gasLimit: gasLimit2,
            gasPrice: gasPrice2
        };
        const Tx2 = await wallet.sendTransaction(tx2);
        await Tx2.wait();

        console.log(`✅ tx hash: https://bscscan.com/tx/${Tx2.hash}`);
        console.log(`📤 value sent: ${ethers.formatEther(Tx2.value)} BNB`);
    } catch (error) {
        console.error("❌ Error selling tokens:", error);
    }
}

sellTokens();
