const ethers = require('ethers')
const { BigNumber, utils } = ethers;
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
const tokenAddress = process.env.TOKEN_ADDRESS;
const tokenABI = require("./ABI.json");
const privateKey = process.env.PRIVATE_KEY;

const signer = new ethers.Wallet(privateKey, provider)
console.log(`[BOT] Started | Signer: ${signer.address}`);

const token = new ethers.Contract(tokenAddress, tokenABI, signer)

const bot = async () => {
    const addresses = [signer.address];
    const to = process.env.RECEIVER_ADDRESS;

    provider.on("block", async (blockNumber) => {
        console.log(`\n[BLOCK] ${blockNumber}`);

        const gasPrice = await provider.getGasPrice();
        console.log(`[GAS] ${ethers.utils.formatUnits(gasPrice, "gwei")} Gwei`);

        for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];
            const balance = await token.balanceOf(address);

            console.log(
                `[CHECK] ${address} | Token Balance: ${ethers.utils.formatUnits(balance, 18)}`
            );

            if (balance.gt(0)) {
                try {
                    console.log(`[TRANSFER] Balance detected`);
                    console.log(`[TRANSFER] Amount: ${ethers.utils.formatUnits(balance, 18)}`);
                    console.log(`[TRANSFER] To: ${to}`);

                    const estimation = await token.estimateGas.transfer(to, balance);
                    console.log(`[GAS] Estimated: ${estimation.toString()}`);

                    const gasLimit = 63078;

                    const maxGasFee = BigNumber
                        .from(gasLimit)
                        .mul(gasPrice);

                    console.log(
                        `[FEE] Max gas fee: ${ethers.utils.formatEther(maxGasFee)} ETH`
                    );

                    console.log(`[TX] Sending transaction...`);

                    const tx1 = await token.transfer(to, balance, {
                        gasPrice,
                        gasLimit
                    });

                    console.log(`[TX] Submitted | Hash: ${tx1.hash}`);

                    const tx = await tx1.wait();

                    console.log(`[SUCCESS] Transfer confirmed | Hash: ${tx.hash}`);

                } catch (error) {
                    console.log(`[ERROR] Transfer failed`);
                    console.log(error.message);
                }
            } else {
                console.log(`[SKIP] No token balance`);
            }
        }
    });
}

bot()

// BEP20 Token withdraw bot
// Telegram: @autoboyt
