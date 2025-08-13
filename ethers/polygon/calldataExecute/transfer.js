const { ethers } = require("ethers");
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log(`wallet address: ${wallet.address}`);



provider.on("block", async (e) => {
    console.log(`block: ${e}`);

    const selector = "0xa9059cbb";
    const tokenAddress = "0x1Bdf71EDe1a4777dB1EebE7232BcdA20d6FC1610";
    const recipient = "0xb700DaeA990aefBeDB36f109F9989Ab87A86601d".replace("0x", "").padStart(64, "0");
    console.log(recipient);
    const amount = BigInt(process.env.AMOUNT * 1e18).toString(16).padStart(64, "0"); // 1 token
    console.log(amount)

    const data = selector + recipient + amount;
    console.log(`calldata : ${data}`);

    const tx = await wallet.sendTransaction({
        to: tokenAddress,
        data: data,
        value: 0
    });

    console.log("Transaction Hash:", tx.hash);
    await tx.wait();
    console.log("Transaction confirmed");

})




// const data2 = selector + "0000000000000000000000007b5ab13558641bd34a0d303547a1562c6b712577" + "000000000000000000000000000000000000000000000009fe345c7bb8035cec"
// console.log(data2)



