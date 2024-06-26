
const {ethers} = require("ethers")

const etherSymbol = ethers.EtherSymbol
console.log(etherSymbol)

console.log(Number.MAX_SAFE_INTEGER)

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth")

const latestBlock = async () => {
    const latestBlockNumber = await provider.getBlockNumber()
    console.log(`latestBlockNumber : ${latestBlockNumber}`)
}

latestBlock()


const computeAddress = ethers.computeAddress("0x736f6c6964697479000000000000000000000000000000000000000000000000")
console.log(computeAddress)

const isAddress = ethers.isAddress("0xf0CD809234B2B5B42230F43533A80b04F23083eE")
console.log(isAddress) // true

const zeroAddress = ethers.ZeroAddress
console.log(zeroAddress) // 0x0000000000000000000000000000000000000000

const formatEther = ethers.formatEther(1234)
console.log(formatEther) // 0.000000000000001234

const formatUnits = ethers.formatUnits(123456, 4)
console.log(formatUnits) // 12.3456

const textToBytes32 = ethers.encodeBytes32String("hello")
console.log(textToBytes32) // 0x736f6c6964697479000000000000000000000000000000000000000000000000
console.log(textToBytes32.length) // 66

const random32Bytes = ethers.randomBytes(32)
console.log(random32Bytes)
console.log(random32Bytes.byteLength) // 32
console.log(random32Bytes.buffer.slice(28))
console.log(ethers.isBytesLike(random32Bytes)) // true

const transferCost = new ethers.GasCostPlugin(1).txBase
console.log(transferCost)
