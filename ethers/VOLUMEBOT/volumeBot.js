const fs = require("fs");
const path = require("path");
const ethers = require("ethers");
require("dotenv").config();

const ROUTER_ABI = require("./RouterABI.json");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

console.table([{ Event: "Main Wallet", Value: wallet.address }]);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const volumeBot = async () => {

    try {
        // 1. Create a new wallet
        const newWallet = ethers.Wallet.createRandom().connect(provider);
        console.log(`🆕 New wallet: ${newWallet.address}`);

        const line = `${newWallet.address} | ${newWallet.privateKey}\n`;
        const WALLETS_FILE = path.join(__dirname, "wallets.txt");
        fs.appendFileSync(WALLETS_FILE, line);

        // 2. Generate random BNB amount
        const randomBNB = (Math.random() * (0.003 - 0.002) + 0.001).toFixed(5);
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

        // Estimate output
        // const amountsOut = await router.getAmountsOut(valueToSend, tokenPath);
        // const amountOutMin = amountsOut[1] * 90n / 100n; // 10% slippage
        // console.log(amountOutMin)

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

    } catch (err) {
        console.log("Error", err);
    }

    // 5. Delay
    const delaySeconds = Math.floor(Math.random() * (240 - 120 + 1)) + 120;
    console.log(`⏳ Delay ${delaySeconds} seconds before next buy`);

    await sleep(delaySeconds * 1000);
};

volumeBot();

// https://bscscan.com/tx/0x4a73f16910cc38fb6b12912bb4b8b3ab2b4958f5183dea7f635e741a94dc4992
