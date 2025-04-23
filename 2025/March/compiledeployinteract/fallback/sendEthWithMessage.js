require("dotenv").config();
const ethers  = require("ethers");
const fs = require("fs")

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
console.log(`wallet address : ${wallet.address}`)

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = JSON.parse(fs.readFileSync("./build/Fallback_sol_Fallback.abi", "utf8"))

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const message = ethers.encodeBytes32String("Good bye");

const interact = async () => {
    const tx = await wallet.sendTransaction({
        to: contract.target,
        data: message,
        value: ethers.parseEther(process.env.ETH_AMOUNT)
    });
    console.log(`Message Sent, tx hash : ${tx.hash}`);
    // Message Sent, tx hash : 0x7385c72c05869b13244c9f45c484d7093ca6496882b020007692d17102f1d3d9
    // 0x476f6f6420627965000000000000000000000000000000000000000000000000 Good bye
};

interact()
