const ethers = require("ethers");

const ABI = require("./build/UserNotes.json");
const tokenAddress = "0x3886f89d8E09dc7F14F3454a677bcc6689701Bac";

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com");
    const wallet = new ethers.Wallet("", provider);

    const tokenContract = new ethers.Contract(tokenAddress, ABI, wallet);

    const saveNote = await tokenContract.saveNote("Day 2 Learning soldity and ethers.js 💡");
    const res = await saveNote.wait();
    console.log(`Save note : ${res.hash}`);

    const getMyNote = await tokenContract.getMyNote();
    console.log(`getMyNote success  : `, getMyNote);
}


deploy();
