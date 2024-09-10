require("dotenv").config();
const ethers = require("ethers");

// Factory
const PANCAKESWAP_FACTORY_ABI = require("./ABI.json");
const PANCAKESWAP_FACTORY_ADDRESS  = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";

// Router
const PANCAKE_ROUTER_ADDRESS ="0x10ED43C718714eb63d5aA57B78B54704E256024E";
const PANCAKE_ROUTER_ABI = require("./ABI2.json");

// WBNB
const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

const BSC_URL = process.env.BSC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(BSC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY);
const signer = wallet.connect(provider);

console.log(`Bot is running with adress: ${wallet.address}`);

const factoryContract = new ethers.Contract(PANCAKESWAP_FACTORY_ADDRESS, PANCAKESWAP_FACTORY_ABI, signer);
const routerContract = new ethers.Contract(PANCAKE_ROUTER_ADDRESS, PANCAKE_ROUTER_ABI, signer);

async function buyToken(tokenAddress, amountInBNB) {
    const amountOutMin = 0;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 1000;
    const tx = {
        value: ethers.parseEther(amountInBNB)
    };
    const path = [
        WBNB,
        tokenAddress
    ];
    try {
        const txResponse = await routerContract.swapExactETHForTokens(amountOutMin, path, wallet.address, deadline, tx);
        console.log('Transaction sent:', txResponse.hash);
        
        // Wait for transaction to be mined
        const receipt = await txResponse.wait();
        console.log('Transaction confirmed in block:', receipt.blockNumber);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

factoryContract.on("PairCreated", (token0, token1, e, amount) => {
    console.log(`New pair created`);
    if (token0 != "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") {
        const newTokenAddress = token0;
        console.log(`New Token address: ${newTokenAddress}`);
        buyToken(newTokenAddress, "0.0001");
    }
})

// https://bscscan.com/tx/0x199c4271e8c1b2bd18ab8183abbd2cdbfbc7892a394600da4c626299fbed2e7f
// Sniper bot on bsc
