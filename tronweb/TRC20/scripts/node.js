require("dotenv").config();
const { TronWeb } = require("tronweb");

const tronWeb = new TronWeb({
    fullHost: process.env.RPC_URL,
    privateKey: process.env.PRIVATE_KEY
});

const block = async () => {
    const block = await tronWeb.trx.getCurrentBlock();
    console.log(block);
}

block();
