const ethers = require("ethers");

const ABI = require("./build/UserNotes.json");
const tokenAddress = "0x8626E045cDFA76c4a59eBAb8Cf6Da5d0e0bd37AD";

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com");
    const wallet = new ethers.Wallet("", provider);

    const tokenContract = new ethers.Contract(tokenAddress, ABI, wallet);

    const withdraw = await tokenContract.getMyNote();
    const tx = await withdraw.wait();
    console.log(`Withdraw success  : `, tx.hash);
}


deploy();
