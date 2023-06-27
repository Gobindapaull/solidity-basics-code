require('dotenv').config()
const ethers = require('ethers')
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)

// wordlist is a set of 2048 words
const ln = ethers.LangEn.wordlist()
const arr = ln._decodeWords()
const first12 = arr.slice(0, 12)
console.log(first12)
