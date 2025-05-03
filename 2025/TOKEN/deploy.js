const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()

const provider = new ethers.JsonRpcProvider("https://base.llamarpc.com")
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
console.log(`wallet address : ${wallet.address}`)


const contractABI = JSON.parse(fs.readFileSync("./build/GRC_sol_GRCToken.abi", "utf8"))
const contractBytecode = fs.readFileSync("./build/GRC_sol_GRCToken.bin", "utf8")

const deploy = async () => {
  // Constructor arguments
  const name = "abc";
  const symbol = "ABC";
  const decimals = 18;
  const supply = 888888889;
  const tokenOwner = "0x7C9A8A7674E659F7dEDc618453df71e4CC91a409";

    const factory = new ethers.ContractFactory(contractABI, "0x" + contractBytecode, wallet)
    const contract = await factory.deploy(name,  symbol, decimals, supply, tokenOwner)

    await contract.waitForDeployment()
    console.log(`Deployed contract address: ${contract.target}`)
}

deploy()
