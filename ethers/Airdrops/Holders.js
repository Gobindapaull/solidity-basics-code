require("dotenv").config();
const ethers = require("ethers");

const ABI = require("./abi.json");

const privateKey = process.env.PRIVATE_KEY;
const url = process.env.URL;
const tokenAddress = process.env.TOKEN_ADDRESS;

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);
const tokenContract = new ethers.Contract(tokenAddress, ABI, signer);

const start = async () => {
  const name = await tokenContract.name();
  console.log("Name : ", name);

  for (let i = 0; i < 30; i++) {
    const receiver = ethers.Wallet.createRandom().address;
    const amount = 10000000000000n;
    const t = await tokenContract.transfer(receiver, amount);
    const tx = await t.wait();
    console.log(`Tx hash ${i} : `, tx.hash);
    console.log(`transfer ${amount} tokens`);
  }
};

start();
