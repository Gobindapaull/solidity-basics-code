const ethers = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function balance() {
    const bal = await provider.getBalance(wallet.address);
    console.log('BNB balance:', ethers.formatEther(bal));

}

balance();
