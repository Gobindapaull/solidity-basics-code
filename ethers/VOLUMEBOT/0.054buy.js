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

            // Send remaining bnb to the main wallet
            const receiver = process.env.MAIN_WALLET;

            const bal = await provider.getBalance(newWallet.address); // returns bigint
            console.log('BNB balance:', ethers.formatEther(bal));

            const gasPrice2 = (await provider.getFeeData()).gasPrice; // bigint
            const gasLimit2 = 21000n;
            const gasCost2 = gasPrice2 * gasLimit2;

            const valueToSend2 = bal - gasCost2;

            if (valueToSend <= 0n) {
                console.error("Not enough BNB to cover gas fees.");
                return;
            }

            const tx2 = {
                to: receiver,
                value: valueToSend2,
                gasLimit: gasLimit2,
                gasPrice: gasPrice2
            };
            const Tx2 = await newWallet.sendTransaction(tx2);
            await Tx2.wait();

            console.log(`✅ tx hash: https://bscscan.com/tx/${Tx2.hash}`);
            console.log(`📤 value sent: ${ethers.formatEther(Tx2.value)} BNB`);


        } catch (err) {
            console.log("Error", err);
        }
        // 5. Delay
        var delaySeconds = Math.floor(Math.random() * (process.env.MAX_DELAY * 60 - process.env.MIN_DELAY * 60 + 1)) + 100;
        console.log(`⏳ Sleeping for ${delaySeconds} seconds ...`);

        await sleep(delaySeconds * 1000);

    }

};

volumeBot();




