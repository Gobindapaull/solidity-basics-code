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

            console.log(`💸 Amount to buy: ${ethers.formatEther(amount)} ETH`);

            // 3. Send ETH to new wallet
            const tx = await wallet.sendTransaction({
                to: newWallet.address,
                value: amount
            });
            await tx.wait();
            console.table([
                { Event: "🆕 New Wallet", Value: newWallet.address },
                { Event: "💸 Sent ETH", Value: `${randomBNB} ETH` },
                { Event: "📦 Transfer Tx Hash", Value: tx.hash }
            ]);

            // 4. Swap ETH → Token
            const tokenPath = [
                process.env.WBNB_ADDRESS,
                process.env.TOKEN_ADDRESS
            ];

            const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
            const router = new ethers.Contract(process.env.PC_ROUTER_ADDRESS, ROUTER_ABI, newWallet);

            const gasPrice = (await provider.getFeeData()).gasPrice;
            const gasLimit = BigInt(process.env.GAS_LIMIT);
            const buffer = ethers.parseEther("0.0001");
            const gasCost = gasPrice * gasLimit;

            // Check if amount is greater than gas cost
            if (amount <= gasCost) {
                console.log(`❌ Insufficient ETH, Random amount too small to cover gas`);
                return;
            }

            const valueToSend = amount - gasCost - buffer;

            const swapTx = await router.swapExactETHForTokens(
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
                { Event: "🔄 Swap Executed", Value: `Swapped ${ethers.formatEther(valueToSend)} ETH for tokens` },
                { Event: "📦 Swap Tx Hash", Value: swapTx.hash }
            ]);

            const bal = await provider.getBalance(newWallet.address); // returns bigint
            console.log('ETH balance:', ethers.formatEther(bal));

            // 5. Delay
            const minTime = parseInt(process.env.MIN_DELAY);
            const maxTime = parseInt(process.env.MAX_DELAY);
            var delaySeconds = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
            console.log(`⏳ Sleeping for ${delaySeconds} seconds ...`);

            await sleep(delaySeconds * 1000);
            console.log(`--------------------------------------------------------------------------------`)

        } catch (err) {
            console.log("Error", err);
        }
    }

};

volumeBot();
