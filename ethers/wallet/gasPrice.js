const ethers = require('ethers')
require('dotenv').config()
const { BigNumber } = ethers;

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)

const GasPrice = async () => {
    
    const gasLimit = 50000; // default 21000
    
    // FeeData
    const gas = await provider.getFeeData()
    console.log(gas)


    // gasPrice in eth
    const gasPrice = (await provider.getFeeData()).gasPrice
    console.log('gasPrice: ', `${ethers.formatEther(gasPrice)} ETH`)

    // maxFeePerGas in eth
    const maxFeePerGas = (await provider.getFeeData()).maxFeePerGas
    console.log('maxFeePerGas: ', `${ethers.formatEther(maxFeePerGas)} ETH`)

    // maxPriorityFeePerGas in eth
    const maxPriorityFeePerGas = (await provider.getFeeData()).maxPriorityFeePerGas
    console.log('maxPriorityFeePerGas: ', `${ethers.formatEther(maxPriorityFeePerGas)} ETH`)

    // tx gas price in eth
    const maxGasFee = BigInt(gasLimit) * (gasPrice)
    console.log('Tx gas price: ', ethers.formatEther(maxGasFee));
}

GasPrice()


// version     "ethers": "^6.6.4"
