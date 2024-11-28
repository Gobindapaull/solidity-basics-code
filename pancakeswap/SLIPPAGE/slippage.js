const ethers = require("ethers");

const url = "https://bsc-dataseed.binance.org";
const privateKey = "0x1bfbff8411ed44e609d911476b0d35a28284545b690902806ea0a7ff0453e931"; // wallet private key
const tokenAddress = "0x1012D033FF807bEff9c20140062C52f9F8DE3B74";
const dexAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const wbnbAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const amountToSell = ethers.parseUnits('3000000', 18);

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey, provider);
console.log(wallet.address);

const erc20ABI = require("./ABI.json");
const dexABI = require("./DexABI.json");

const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, wallet);
const dexContract = new ethers.Contract(dexAddress, dexABI, wallet);

async function sellTokens(amountIn, slippagePercentage) {
    try {
        const balance = await tokenContract.balanceOf(wallet.address);
        console.log(`Current token balance: ${ethers.formatUnits(balance, 18)} tokens`);


        const path = [tokenAddress, wbnbAddress];
        // Get the current exchange rate
        const amountsOut = await dexContract.getAmountsOut(amountIn, path);
        const expectedETH = ethers.getBigInt(amountsOut[1]);
        console.log(`Expected ETH: ${ethers.formatUnits(expectedETH, 18)} ETH`);

        // // Calculate minimum amount of ETH based on slippage tolerance
        // const slippageFactor = (100 - slippagePercentage) / 100;
        // const minETHOut = expectedETH.mul(slippageFactor.toFixed(4));
        // console.log(`Minimum ETH after ${slippagePercentage}% slippage: ${ethers.formatUnits(minETHOut, 18)} ETH`);
       
    

    } catch (error) {
        console.log('Error selling tokens', error);
    }
}

const amountIn = ethers.parseUnits("3000000", 18);
const slippagePercentage = 2; // 2% slippage tolerance
sellTokens(amountIn, slippagePercentage);


