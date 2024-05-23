const ethers = require("ethers")

const wallet = ethers.Wallet.fromMnemonic("")
console.log(wallet.privateKey)
console.log(wallet.address)

//  "ethers": "^5.6.8"
