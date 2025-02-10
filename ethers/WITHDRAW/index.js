const ethers = require("ethers");
require("dotenv").config();

const TOKEN_ABI = require("./TOKEN_ABI.json");

const RPC_URL = process.env.RPC_URL;
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;
const COMPROMISED_PRIVATE_KEY = process.env.COMPROMISED_PRIVATE_KEY;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

const provider = new ethers.JsonRpcProvider(RPC_URL);

const compromised = new ethers.Wallet(COMPROMISED_PRIVATE_KEY, provider);
console.log(`compromised wallet address : ${compromised.address}`);

const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, compromised);


provider.on("block", async (e) => {
    console.log(`block : ${e}`);
    try {
        // symbol()
        const symbol = await tokenContract.symbol();

        // balanceOf()
        const balance = await tokenContract.balanceOf(compromised.address);
        console.log(`token balance : ${ethers.formatUnits(balance, 9)} ${symbol}`);

        // withdraw() // writeable function
        const amount = 1199000000;
        const withdraw = await tokenContract.transfer(RECIPIENT_ADDRESS, balance);
        const withdrawTx = await withdraw.wait();
        console.log(`token claim successful : ${withdrawTx.hash}`);


    } catch (error) {
        console.log(error);
    }
});
