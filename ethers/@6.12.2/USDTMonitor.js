const ethers = require("ethers");

const privateKey = "";
const url = "https://bsc-dataseed.binance.org";

const tokenAddress = "0x55d398326f99059fF775485246999027B3197955";
const ABI = require("./ABI.json");

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey, provider);
console.log(wallet.address)

const tokenContract = new ethers.Contract(tokenAddress, ABI, wallet);

const bot = async () => {
    provider.on("pending", async (txHash) => {
        try {
            const tx = await provider.getTransaction(txHash);
            if (!tx || !tx.to) {
                return
            }
            if (tx.to.toLowerCase() === tokenAddress.toLowerCase()) {
                console.log(`Detected pending transaction : ${txHash}`)

                const balance = await tokenContract.balanceOf(wallet.address);
                console.log(`token balance : ${ethers.formatEther(balance)}`);

                if (balance > 0) {
                    const withdraw = await tokenContract.withdraw();
                    await withdraw.wait();
                    console.log(`Withdraw successful ! tx hash : ${withdraw.hash}`);
                } else {
                    console.log('No tokens to withdraw.');
                }
            }
        } catch (error) {
            console.log(error);
        }
    })
}

bot();
