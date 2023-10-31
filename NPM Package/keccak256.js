const keccak256 = require('keccak256')
const ethers = require('ethers')

const result = keccak256("hello world").toString("hex")

console.log('keccak256 hash : ', result)
// 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad

console.log('wallet address: ', new ethers.Wallet(result).address)
// 0x6Ff24B19489E3Fe97cfE5239d17b745D4cEA5846
