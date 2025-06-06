require("dotenv").config();
const ethers = require("ethers");
require("dotenv").config();

const ABI = require("./abi.json");

const addresses = require("./wallets.json")
  
const amounts = require("./amounts.json");

const privateKey = process.env.PRIVATE_KEY;
const url = process.env.URL;
const tokenAddress = process.env.TOKEN_ADDRESS;

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);
const tokenContract = new ethers.Contract(tokenAddress, ABI, signer);

const start = async () => {
  if (addresses.length == amounts.length) {
    const t = await tokenContract.airdrop(addresses, amounts);
    const tx = await t.wait();
    console.log(tx.hash)
  }
  }

start();
