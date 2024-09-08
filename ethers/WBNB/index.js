require("dotenv").config();
const ethers = require("ethers");

const { INTERVAL, URL, QUOTER_ADDRESS, TOKEN_IN_ADDRESS, TOKEN_OUT_ADDRESS } = process.env;

const ABI = require("./QuoterABI.json")

const provider = new ethers.JsonRpcProvider(URL)

async function execute(tokenIn, tokenOut, fee) {
    const contract = new ethers.Contract(QUOTER_ADDRESS, ABI, provider)

    const [amountOut] = await contract.quoteExactInputSingle.staticCall(
        {
            tokenIn,
            tokenOut,
            fee,
            amountIn: ethers.parseEther("1"),
            sqrtPriceLimitX96: 0
        }
    )
    console.log(`1 WBNB = ${ethers.formatEther(amountOut)} USDT`)
}


setInterval(() => execute(TOKEN_IN_ADDRESS, TOKEN_OUT_ADDRESS, 100), INTERVAL)
