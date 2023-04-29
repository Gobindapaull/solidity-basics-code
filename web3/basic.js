const Web3 = require('web3')
const web3 = new Web3("https://mainnet.infura.io/v3/")

// block number
web3.eth.getBlockNumber().then(console.log)

// latest block all tx
web3.eth.getBlock('latest').then(console.log)

// latest block hash
web3.eth.getBlock('latest').then((block) => {
    console.log({
        blockHash: block.hash,
        blockNumber: block.number
    })
})
// latest 10 block hash and number
web3.eth.getBlockNumber().then((latest) => {
    for (i = 0; i < 10; i++) {
        web3.eth.getBlock(latest - i).then((block) => {
            console.log({
                blockHash: block.hash,
                blockNumber: block.number
            })
        })
    }
})

// total transactions in a block
web3.eth.getBlockTransactionCount('latest').then(console.log)

hash = '0x4038f53f6b47e929c36599cfc952cdd95dca3db358f6ba2eac6c13966e3bdf00'
web3.eth.getTransactionFromBlock(hash, 3).then(console.log)

