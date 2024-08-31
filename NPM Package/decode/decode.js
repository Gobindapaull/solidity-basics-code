const ethers = require("ethers")
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth")
const txHash = "0xe038e712883e52ec0d7d5640b01dc2091f84e8e2a60b8db68d1d01ce864e3a1e"

const main = async () => {
    const tx = await provider.getTransactionReceipt(txHash)
    const sig = 'Swap(address,address,int256,int256,uint160,uint128,int24)'
    const sigBytes = ethers.toUtf8Bytes(sig)
    const hash = ethers.keccak256(sigBytes)
    console.log(hash)
}

main()
