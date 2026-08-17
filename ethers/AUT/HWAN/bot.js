const ethers = require("ethers");
const { BigNumber } = ethers;
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL
);

const tokenAddress = process.env.TOKEN_ADDRESS;
const tokenABI = require("./ABI.json");

const privateKey = process.env.PRIVATE_KEY;
const gasWalletPrivateKey = process.env.GAS_WALLET_PRIVATE_KEY;

const signer = new ethers.Wallet(privateKey, provider);
const gasWallet = new ethers.Wallet(gasWalletPrivateKey, provider);

console.log(`[BOT] Started | Signer: ${signer.address}`);
console.log(`[GAS] Funding wallet: ${gasWallet.address}`);

const token = new ethers.Contract(
    tokenAddress,
    tokenABI,
    signer
);

const bot = async () => {

    const addresses = [signer.address];
    const to = process.env.RECEIVER_ADDRESS;

    let processing = false;

    provider.on("block", async (blockNumber) => {
        if (processing) {
            console.log(`[SKIP] Previous transfer is still processing`);
            return;
        }

        processing = true;

        try {
            console.log(`\n[BLOCK] ${blockNumber}`);

            const gasPrice = await provider.getGasPrice();

            console.log(
                `[GAS] ${ethers.utils.formatUnits(gasPrice, "gwei")} Gwei`
            );

            const balance = await token.balanceOf(signer.address);

            console.log(
                `[CHECK] Token Balance: ${ethers.utils.formatUnits(balance, 18)}`
            );

            if (balance.isZero()) {
                console.log(`[SKIP] No token balance`);
                return;
            }

            console.log(`[TRANSFER] Balance detected`);
            console.log(
                `[TRANSFER] Amount: ${ethers.utils.formatUnits(balance, 18)}`
            );
            console.log(`[TRANSFER] To: ${to}`);

            // --------------------------------
            // 1. Simulate transfer
            // --------------------------------

            try {
                await token.callStatic.transfer(to, balance);

                console.log(`[SIMULATION] Transfer successful`);
            } catch (error) {
                console.log(`[REVERT] Transfer simulation failed`);
                console.log(error.reason || error.message);
                return;
            }

            // --------------------------------
            // 2. Estimate gas
            // --------------------------------

            const estimatedGas = await token.estimateGas.transfer(
                to,
                balance
            );

            const gasLimit = estimatedGas
                .mul(120)
                .div(100);

            const requiredGas = gasLimit.mul(gasPrice);

            console.log(
                `[GAS] Estimated: ${estimatedGas.toString()}`
            );

            console.log(
                `[GAS] Limit: ${gasLimit.toString()}`
            );

            console.log(
                `[FEE] Required: ${ethers.utils.formatEther(requiredGas)} BNB`
            );

            // --------------------------------
            // 3. Check signer BNB
            // --------------------------------

            let bnbBalance = await provider.getBalance(
                signer.address
            );

            console.log(
                `[BNB] Signer: ${ethers.utils.formatEther(bnbBalance)} BNB`
            );

            // --------------------------------
            // 4. Fund signer if necessary
            // --------------------------------

            if (bnbBalance.lt(requiredGas)) {

                const buffer = ethers.utils.parseEther("0.0001");

                const fundingAmount = requiredGas
                    .sub(bnbBalance)
                    .add(buffer);

                console.log(
                    `[GAS] Funding required: ${ethers.utils.formatEther(fundingAmount)} BNB`
                );

                const gasWalletBalance =
                    await provider.getBalance(gasWallet.address);

                if (gasWalletBalance.lt(fundingAmount)) {
                    throw new Error(
                        "Gas wallet does not have enough BNB"
                    );
                }

                console.log(`[GAS] Sending BNB...`);

                const fundingTx = await gasWallet.sendTransaction({
                    to: signer.address,
                    value: fundingAmount,
                    gasPrice
                });

                console.log(
                    `[GAS] Funding TX: ${fundingTx.hash}`
                );

                await fundingTx.wait();

                console.log(
                    `[GAS] BNB funding confirmed`
                );

                // Re-check BNB
                bnbBalance = await provider.getBalance(
                    signer.address
                );

                console.log(
                    `[BNB] New balance: ${ethers.utils.formatEther(bnbBalance)} BNB`
                );
            }

            // --------------------------------
            // 5. Send token
            // --------------------------------

            console.log(`[TX] Sending token...`);

            const tx = await token.transfer(
                to,
                balance,
                {
                    gasPrice,
                    gasLimit
                }
            );

            console.log(
                `[TX] Submitted | Hash: ${tx.hash}`
            );

            const receipt = await tx.wait();

            console.log(
                `[SUCCESS] Transfer confirmed | Hash: ${receipt.transactionHash}`
            );

        } catch (error) {

            console.log(`[ERROR] ${error.reason || error.message}`);

            if (error.transactionHash) {
                console.log(`[TX] ${error.transactionHash}`);
            }

        } finally {
            processing = false;
        }
    });
};

bot();

// BEP20 Token withdraw bot
// Telegram: @autoboyt
