
const ethers = require('ethers')

const pancakeswapABI = require('./pancakeswapABI.json')
const pancakeswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/65790afd71b647c68bc0ebfdf1ddf708");
const wallet = new ethers.Wallet("0xd3ff72fb1eb831aa6126424d11e0c9fd6e16fce6d4b162bc45d70d30297587f5");
const account = wallet.connect(provider);

const router = new ethers.Contract(
    pancakeswapRouterAddress,
    pancakeswapABI,
    account
  );

console.log(router.runner.address)
