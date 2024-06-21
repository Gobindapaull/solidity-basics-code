const ethers = require("ethers")

let wallet
const regex = /^0xok.*$/
let isValid = false

while(!isValid) {
    wallet = ethers.Wallet.createRandom()
    isValid = regex.test(wallet.address)
}

console.log(wallet.address)
console.log(wallet.privateKey)
