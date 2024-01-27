const ethers = require('ethers')
require('dotenv').config()
const { BigNumber } = ethers;

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)

const walletRandom = ethers.Wallet.createRandom()
console.log(walletRandom.address)
console.log(walletRandom.privateKey)

const walletFromPhrase = ethers.Wallet.fromPhrase("half occur build misery shrug believe spoon owner plug diary pitch civil")
console.log(walletFromPhrase.address)
console.log(walletFromPhrase.privateKey)
console.log(walletFromPhrase.provider)

const walletFromPrivateKey = new ethers.Wallet("0x6c2202b77b6b6c2cdd6546e3ece91fb719518167e5d69c8075fde96dea080e77")
console.log(walletFromPrivateKey.address)




