const ethers = require("ethers");

const ABI = require("./build/WithdrawAll.json");
const tokenAddress = "0x77144097266a5cdf5188f4a210953F4a787b33EE";

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/polygon");
    const wallet = new ethers.Wallet("", provider);

    const tokenContract = new ethers.Contract(tokenAddress, ABI, wallet);

    const withdraw = await tokenContract.Withdraw();
    const tx = await withdraw.wait();
    console.log(`Withdraw success  : `, tx.hash);
}


deploy();

// https://polygonscan.com/tx/0xf34927f3adbd3da84d4bdd0989f2a63710be37287a7ac5da61b37f2d45c01291
