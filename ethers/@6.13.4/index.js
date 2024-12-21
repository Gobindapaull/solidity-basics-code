const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org");

const addressReceiver = "";
const privateKey = "";

//

provider.on("block", async (e) => {
    console.log(`Listening new block, waiting ...`);
    console.log(`block : ${e}`);

    const target = new ethers.Wallet(privateKey, provider);
    console.log(`target address : ${target.address}`);

    const balance = await provider.getBalance(target.address);
    console.log(`balance : ${ethers.formatEther(balance)} BNB`);

    const gasLimit = 21000; // change gas limit
    const gasPrice = ((await provider.getFeeData()).gasPrice) * BigInt(5); // change gas price
    console.log(`GWEI : ${ethers.toNumber(gasPrice) / 1e9}`);

    const maxGasFee = ethers.toBigInt(gasLimit) * gasPrice;
    console.log(`tx gas price : ${ethers.formatEther(maxGasFee)} BNB`);

    const withdrawAmount = balance - maxGasFee;

    if (withdrawAmount > 0) {
        try {
            await target.sendTransaction({
                to: addressReceiver,
                value: withdrawAmount
            });
            console.log(`Success ! transferred --> ${ethers.formatEther(withdrawAmount)}`);
        } catch (error) {
            console.log(error);
        }
    }
})

// npm i ethers@6.13.4
