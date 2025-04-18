const ethers = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const receiver = process.env.RECEIVER_ADDRESS;

async function transferBNB() {
    const bal = await provider.getBalance(wallet.address); // returns bigint
    console.log('BNB balance:', ethers.formatEther(bal));

    const gasPrice = (await provider.getFeeData()).gasPrice; // bigint
    const gasLimit = 21000n;
    const gasCost = gasPrice * gasLimit;

    const valueToSend = bal - gasCost;

    if (valueToSend <= 0n) {
        console.error("Not enough BNB to cover gas fees.");
        return;
    }

    const tx = {
        to: receiver,
        value: valueToSend,
        gasLimit: gasLimit,
        gasPrice: gasPrice
    };

    const Tx = await wallet.sendTransaction(tx);
    await Tx.wait();

    console.log(`✅ tx hash: https://bscscan.com/tx/${Tx.hash}`);
    console.log(`📤 value sent: ${ethers.formatEther(Tx.value)} BNB`);
}

transferBNB();
