require('dotenv').config()
const ethers = require('ethers')
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)
// or const provider = new ethers.getDefaultProvider()

// Chain Id
const network = provider.getNetwork()
network.then((network) => console.log('chainId: ', network.chainId.toString()))

// block number
const blockNumber = provider.getBlockNumber()
blockNumber.then((blockNo) => console.log(blockNo))

// Vitalik eth balance
const bal = provider.getBalance("vitalik.eth")
bal.then((balance) => console.log('balance: ', ethers.formatEther(balance)))

// nonce
const nonce = provider.getTransactionCount("vitalik.eth")
nonce.then((nonce) => console.log(nonce))

// getTransactionReceipt
const getTransactionReceipt = provider.getTransactionReceipt("0xa9c9f00a7e9fac43a22d1f402dad47a39e6d366adfb9a820addad5aaa25cc060")
getTransactionReceipt.then((gtr) => console.log(gtr))
