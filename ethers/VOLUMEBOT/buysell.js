const fs = require("fs");
const path = require("path");
const ethers = require("ethers");
require("dotenv").config();

const ROUTER_ABI = require("./RouterABI.json");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

console.table([{ Event: "Main Wallet", Value: wallet.address }]);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sellTokens(_newWallet) {
    // Create provider and wallet
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(_newWallet, provider);

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
            balance - ethers.parseUnits("1", 18),
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
        console.log("📝 Approving tokens...");
        const approveTx = await tokenContract.approve(process.env.PC_ROUTER_ADDRESS, balance);
        await approveTx.wait();
        console.log("✅ Tokens approved for sale!");

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

const volumeBot = async () => {
    while (true) {

        try {
            // 1. Create a new wallet
            let newWallet = ethers.Wallet.createRandom().connect(provider);
            console.log(`🆕 New wallet: ${newWallet.address}`);

            const line = `${newWallet.address} | ${newWallet.privateKey}\n`;
            const WALLETS_FILE = path.join(__dirname, "wallets.txt");
            fs.appendFileSync(WALLETS_FILE, line);


            const min = parseFloat(process.env.MIN_BNB_BUY);
            const max = parseFloat(process.env.MAX_BNB_BUY);

            const randomBNB = (Math.random() * (max - min) + min).toFixed(5);
            const amount = ethers.parseEther(randomBNB);

            console.log(`💸 Amount to buy: ${ethers.formatEther(amount)} BNB`);

            // 3. Send BNB to new wallet
            const tx = await wallet.sendTransaction({
                to: newWallet.address,
                value: amount
            });
            await tx.wait();
            console.table([
                { Event: "🆕 New Wallet", Value: newWallet.address },
                { Event: "💸 Sent BNB", Value: `${randomBNB} BNB` },
                { Event: "📦 Transfer Tx Hash", Value: tx.hash }
            ]);

            // 4. Swap BNB → Token
            const tokenPath = [
                process.env.WBNB_ADDRESS,
                process.env.USDT_ADDRESS,
                process.env.TOKEN_ADDRESS
            ];

            const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
            const router = new ethers.Contract(process.env.PC_ROUTER_ADDRESS, ROUTER_ABI, newWallet);

            const gasPrice = (await provider.getFeeData()).gasPrice;
            const gasLimit = BigInt(process.env.GAS_LIMIT);
            const buffer = ethers.parseEther("0.0002");
            const gasCost = gasPrice * gasLimit;

            // Check if amount is greater than gas cost
            if (amount <= gasCost) {
                console.log(`❌ Insufficient BNB, Random amount too small to cover gas`);
                return;
            }

            const valueToSend = amount - gasCost - buffer;

            const swapTx = await router.swapExactETHForTokensSupportingFeeOnTransferTokens(
                0, // amountOutMin
                tokenPath,
                newWallet.address,
                deadline,
                {
                    value: valueToSend,
                    gasLimit: gasLimit,
                    gasPrice: gasPrice
                }
            );

            await swapTx.wait();
            console.table([
                { Event: "🔄 Swap Executed", Value: `Swapped ${ethers.formatEther(valueToSend)} BNB for tokens` },
                { Event: "📦 Swap Tx Hash", Value: swapTx.hash }
            ]);

            const bal = await provider.getBalance(newWallet.address); // returns bigint
            console.log('BNB balance:', ethers.formatEther(bal));

            // 5. Delay
            const minTime = parseInt(process.env.MIN_DELAY);
            const maxTime = parseInt(process.env.MAX_DELAY);
            var delaySeconds = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
            console.log(`⏳ Sleeping for ${delaySeconds} seconds ...`);

            await sleep(delaySeconds * 1000);
            console.log(`--------------------------------------------------------------------------------`)

            // sell tokens
            await sellTokens(newWallet.privateKey);
            console.log(`--------------------------------------------------------------------------------`)

            // Convert USDT to BNB
            await sellUSDT();
            console.log(`--------------------------------------------------------------------------------`)

            console.log(`⏳ Sleeping for ${delaySeconds} seconds ...`);
            await sleep(delaySeconds * 1000);

        } catch (err) {
            console.log("Error", err);
        }
    }

};

volumeBot();




