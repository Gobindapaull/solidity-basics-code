require("dotenv").config();
const ethers  = require("ethers");
const fs = require("fs")

const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
console.log(`wallet address : ${wallet.address}`)

const contractAddress = "0x30Fe7A8B7C14bd59fFf6dEA4c672B8F0854B50fC"
const ABI = JSON.parse(fs.readFileSync("./build/SelfDestruct_sol_SelfDestructContract.abi", "utf8"))

const contract = new ethers.Contract(contractAddress, ABI, wallet)

const interact = async () => {
    const boom = await contract.destroy()
    const tx = await boom.wait()

    console.log(`contract destroyed successfully . Hash : ${tx.hash}`)
}

interact()
