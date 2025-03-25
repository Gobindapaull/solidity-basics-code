const ethers = require("ethers");
require("dotenv").config();

const ABI = require("./ABI.json");
const BYTECODE = require("./BYTECODE.json");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log(`wallet address: ${wallet.address}`);

const deploy = async () => {
    const factory = new ethers.ContractFactory(ABI, BYTECODE, wallet);
    const contract = await factory.attach("0xaCC4aC535E191815789996161f943Be60aBDa225");
    console.log(`Name : ${await contract.getName()}`);
}

deploy();
