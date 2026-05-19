const { TronWeb } = require("tronweb");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const userWallet = process.env.USER_WALLET;

const tronweb = new TronWeb({
    fullHost: process.env.FULL_HOST,
    privateKey
});

const usdt = process.env.USDT_ADDRESS;

async function main() {
    // Latest block
    const block = await tronweb.trx.getCurrentBlock();
    console.log(`Current block: ${block.block_header.raw_data.number}`);

    // Get wallet address
    const wallet = tronweb.address.fromPrivateKey(privateKey);
    console.log(`Wallet address: ${wallet}`);

    // TRX balance
    const trxBalance = await tronweb.trx.getBalance(userWallet);
    console.log(`TRX: ${tronweb.fromSun(trxBalance)}`);


}

main();
