const ethers = require("ethers")
console.log(ethers.version) // 6.13.5

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const main = async () => {
    // Create random wallet and private key
    const wallet = ethers.Wallet.createRandom(provider)
    console.log(wallet.address)    
    console.log(wallet.privateKey)

    // Create random 32 bytes data
    const bytes32 = new ethers.randomBytes(32)
    console.log(bytes32)
    
    // getCreate2Address()
    const addr = ethers.getCreate2Address(wallet.address, bytes32, bytes32)
    console.log(addr) // 0xd5F12de0A354BA367aC71D34ddb2FEFd1241A435

    // AnkrProvider
    const x = new ethers.AnkrProvider()
    console.log((await x._detectNetwork()).name) // mainnet
    console.log((await x._detectNetwork()).chainId) // 1n

}

main()

// "dependencies": {
//     "ethers": "^6.13.5"
//   }
