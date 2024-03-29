const ethers = require('ethers')
require('dotenv').config()

const pancakeswapABI = require('./pancakeswapABI.json')
const pancakeswapRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const bsc = process.env.BSC_NODE;
const provider = new ethers.JsonRpcProvider(bsc);

const mnemonic = process.env.YOUR_MNEMONIC;
const wallet = ethers.Wallet.fromPhrase(mnemonic);
const account = wallet.connect(provider);

const router = new ethers.Contract(
    pancakeswapRouterAddress,
    pancakeswapABI,
    account
  );

console.log(router)
