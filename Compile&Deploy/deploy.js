const contractFile = require('./compile')

const ethers = require('ethers')
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const from = ''
const fromPrivate = ''
const wallet = new ethers.Wallet(fromPrivate, provider)

const bytecode = contractFile.evm.bytecode.object
console.log(bytecode)

const abi = contractFile.abi
console.log(abi)

const contractDeploy = new ethers.ContractFactory(abi, bytecode, wallet)
console.log(contractDeploy.runner)

const deployContract = async () => {
    const tx = await contractDeploy.deploy()
    const txReceipt = tx.deploymentTransaction().wait()
    console.log(txReceipt)
    
}

deployContract()
