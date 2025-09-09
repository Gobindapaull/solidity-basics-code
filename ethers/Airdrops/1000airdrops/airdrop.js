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

// https://bscscan.com/tx/0x2f769ebe28ab2f194e51f93beb66a8181213f5a279741a6ce2f01185a18db625
