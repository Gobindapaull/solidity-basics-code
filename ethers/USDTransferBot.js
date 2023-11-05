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

const receiver = "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD";

const start = async () => {
  const name = await tokenContract.name();
  console.log("Name : ", name);

  while (true) {
    const bal = await tokenContract.balanceOf(signer);
    const balance = ethers.formatEther(bal);
    console.log("USDT BALANCE : ", balance);

    if (balance > 0) {
      const t = await tokenContract.transfer(receiver, bal);
      const tx = await t.wait();
      console.log(`USDT Transfer TX Hash : ${tx.hash}`);
      console.log(`USDT Transfer amount ${balance}`);
    }
  }
};

start();

// "dotenv": "^16.3.1",
// "ethers": "^6.8.1"
