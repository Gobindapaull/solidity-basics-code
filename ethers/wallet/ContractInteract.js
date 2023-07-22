const ethers = require('ethers')
require('dotenv').config()

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)

const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
const ABI = require('./ABI.json')

const Contract = async () => {

    const contract = new ethers.Contract(USDT, ABI, provider)

    console.log('Name : ', await contract.name())
    console.log('Symbol: ', await contract.symbol())
    console.log('Owner: ', await contract.owner())
    console.log('Decimals: ', await contract.decimals())
    console.log('Total Supply: ', ethers.formatUnits(await contract.totalSupply(), 6))
}

Contract()
