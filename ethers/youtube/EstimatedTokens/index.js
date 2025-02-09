const ethers = require("ethers");
require("dotenv").config();

const UNISWAP_ABI = require("./uniswap.json"); // Ensure this JSON file is correct


const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log(`signer : ${wallet.address}`);

const uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const tokenAddress = "0x78F0f4Fa89Dd7112da4785A9b00C35BAD1F23e8a";
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const router = new ethers.Contract(uniswapRouterAddress, UNISWAP_ABI, wallet);

async function getEstimatedTokens(ethAmount) {
    const amounts = await router.getAmountsOut(ethers.utils.parseEther(ethAmount.toString()), [
        WETH,
        tokenAddress
    ]);
    return ethers.utils.formatUnits(amounts[1], 9);

}

const bot = async () => {
    try {
        const estimated = await getEstimatedTokens(0.3);
        console.log(`Estimated tokens for 0.1 ETH: ${estimated}`);
    } catch (error) {
        console.log(error);
    }
}

bot();
