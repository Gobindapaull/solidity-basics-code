const { ethers } = require("ethers");
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log(`wallet address: ${wallet.address}`);


provider.on("block", async (e) => {
    console.log(`block: ${e}`);
    
    const contractAddress = "0x5bdf9D655f12A16081e0Ef7FD58b22b6269cF3f1"; // the contract where claim() exists

    const selector = process.env.SELECTOR;
    const tokenAddress = process.env.TOKEN_ADDRESS;
    const recipient = process.env.RECEIVER_ADDRESS.replace("0x", "").padStart(64, "0");
    console.log(recipient);
    const amount = BigInt(process.env.AMOUNT * 1e18).toString(16).padStart(64, "0"); // 1 token
    console.log(amount)

    const data = selector + recipient + amount;
    console.log(`calldata : ${data}`);

    // claim tx
    const claimTx = await wallet.sendTransaction({
        to: contractAddress,
        data: "0x4e71d92d", // claim() selector
        value: 0n // usually no ETH is needed
    });

    await claimTx.wait();
    console.log("Tx Hash:", claimTx.hash);
    console.log("Claim executed successfully!");

    // transfer tx
    const tx = await wallet.sendTransaction({
        to: tokenAddress,
        data: data,
        value: 0n
    });

    await tx.wait();
    console.log("Transaction Hash:", tx.hash);
    console.log("Transaction confirmed");

})
