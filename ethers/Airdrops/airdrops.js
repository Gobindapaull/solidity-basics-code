require("dotenv").config();
const ethers = require("ethers");

const ABI = require("./abi.json");

const addresses = [
    "0xb6ff4f8e7d3d182356260533ecf880dc45c4dfd9",
    "0xc3264d7861a8ba2d073aaaf2d2f86537e7a86a54",
    "0x2d256f8ca272c892b685f81014963f6c994b6eab",
    "0xddb6e8fa772f23c742d621cda94efc71a112dbe9",
    "0x279c7fcf8e738a926100e068b90adce94232e798",
    "0x365d54CcD82126d2aaB46A3cea43bf51367bdCab",
    "0xEc33FE6A9dafE7a9ff259122cbBEA778539052DB",
    "0xfab79700D89414B56d0Db8f2f3396dE2aF6182d9",
    "0x6CF67199EfE54Da0D5D717b0ecA85E95C2FD01D8",
  ]
  
const amounts = [
      "5000000000000000000",
      "5000000000000000000",
      "5000000000000000000",
      "5000000000000000000",
      "5000000000000000000",
      "5000000000000000000",
      "5000000000000000000",
      "5000000000000000000",
      "5000000000000000000"
  ]

const privateKey = process.env.PRIVATE_KEY;
const url = process.env.URL;
const tokenAddress = process.env.TOKEN_ADDRESS;

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);
const tokenContract = new ethers.Contract(tokenAddress, ABI, signer);

const start = async () => {
  if (addresses.length == amounts.length) {
    const t = await tokenContract.Airdrops(addresses, amounts);
    const tx = await t.wait();
    console.log(tx.hash)
  }
  }

start();
