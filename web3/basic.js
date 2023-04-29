const Web3 = require('web3')
const web3 = new Web3("https://mainnet.infura.io/v3/")

// block number
web3.eth.getBlockNumber().then(console.log)

// latest block all tx
web3.eth.getBlock('latest').then(console.log)

// latest block hash
web3.eth.getBlock('latest').then((block) => {
    console.log(block.hash)
})

