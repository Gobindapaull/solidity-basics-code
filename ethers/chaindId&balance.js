require('dotenv').config()
const ethers = require('ethers')
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)
// or const provider = new ethers.getDefaultProvider()

// Chain Id
const network = provider.getNetwork()
network.then((network) => console.log('chainId: ',network.chainId.toString()))

// Vitalik eth balance
const bal = provider.getBalance("vitalik.eth")
bal.then((balance) => console.log('balance: ', ethers.formatEther(balance)))
