require("dotenv").config();
const ethers  = require("ethers");
const fs = require("fs")

const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
console.log(`wallet address : ${wallet.address}`)

const contractAddress = "0x0a5ed3e085f60f17B19820907d470cC1B1493D0E";
const contractABI = JSON.parse(fs.readFileSync("./build/TimeLock_sol_TimeLock.abi", "utf8"))

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const interact = async () => {
    let releaseTime = await contract.releaseTime();
    console.log("releaseTime:", releaseTime);

    const tx = await contract.withdraw();
    await tx.wait();

    console.log("Withdraw done :) ");
};

interact()
