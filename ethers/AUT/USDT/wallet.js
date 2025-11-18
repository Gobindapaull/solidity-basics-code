const ethers = require('ethers')
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth")

const walletFromPrivateKey = new ethers.Wallet("0x033e17d3f011febf76eede7e06b07413c4a33dfabe74fc122fc204584e563ad8", provider);
console.log(walletFromPrivateKey.address)
