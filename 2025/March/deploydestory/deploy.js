const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()

const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
console.log(`Wallet address : ${wallet.address}`)


const ABI = JSON.parse(fs.readFileSync("./build/SelfDestruct_sol_SelfDestructContract.abi", "utf8"))
const Bytecode = fs.readFileSync("./build/SelfDestruct_sol_SelfDestructContract.bin", "utf8")

const deploy = async () => {
    const factory = new ethers.ContractFactory(ABI, "0x" + Bytecode, wallet)
    const contract = await factory.deploy(5)

    await contract.waitForDeployment()
    console.log(`Deployed contract address : ${contract.target}`)
}

deploy()
