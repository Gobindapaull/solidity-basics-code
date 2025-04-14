const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()

const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
console.log(`wallet address : ${wallet.address}`)


const contractABI = JSON.parse(fs.readFileSync("./build/Token_sol_Token.abi", "utf8"))
const contractBytecode = fs.readFileSync("./build/Token_sol_Token.bin", "utf8")

const deploy = async () => {
    const factory = new ethers.ContractFactory(contractABI, "0x" + contractBytecode, wallet)
    const contract = await factory.deploy()

    await contract.waitForDeployment()
    console.log(`Deployed contract address: ${contract.target}`)
}

deploy()
