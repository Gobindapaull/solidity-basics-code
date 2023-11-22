const ethers = require('ethers')

const wallet = ethers.Wallet.fromPhrase("paste your 12 words phrase here")
console.log(wallet.privateKey)
console.log(wallet.address)

// "dependencies": {
//     "ethers": "^6.8.1"
//   }
