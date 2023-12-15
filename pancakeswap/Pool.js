// Import required modules and ABIs
const hardhat = require('hardhat');
const pancakeRouterAbi = require('./abis/pancakeSwapRouter.json');
const pancakeFactoryAbi = require('./abis/pancakeSwapFactory.json');
const usdcAbi = require('./abis/usdc.json');
const wethAbi = require('./abis/weth.json');

// Define contract addresses for PancakeSwap Router, Factory, USDC, and WETH
const pancakeRouterAddress = '0x13f4EA83D0bd40E75C8222255bc855a974568Dd4';
const pancakeFactoryAddress = '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865';
const usdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const wethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

// Define a signer address
const signerAddress = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';

// Main function to execute the transaction
async function executeTransaction(){
    // Initialize provider and contracts
    const provider = hardhat.ethers.provider;
    const factoryContract = new hardhat.ethers.Contract(pancakeFactoryAddress, pancakeFactoryAbi, provider);

    // Retrieve the pool address for WETH/USDC pair
    const poolAddress = await factoryContract.getPool(wethAddress, usdcAddress, '500');
    console.log('poolAddress', poolAddress);

    // Impersonate the signer
    const signer = await hardhat.ethers.getImpersonatedSigner(signerAddress);

    // Initialize WETH and USDC contracts
    const wethContract = new hardhat.ethers.Contract(wethAddress, wethAbi, provider);
    const usdcContract = new hardhat.ethers.Contract(usdcAddress, usdcAbi, provider);

    // Define the amount to be swapped
    const amountIn = hardhat.ethers.utils.parseUnits('1', '18');

    // Approve the router to spend WETH
    await wethContract.connect(signer).approve(pancakeRouterAddress, amountIn.toString());

    // Initialize PancakeSwap Router contract
    const pancakeRouterContract = new hardhat.ethers.Contract(pancakeRouterAddress, pancakeRouterAbi, provider);

    // Set the parameters for the swap
    const params = {
        tokenIn: wethAddress,
        tokenOut: usdcAddress,
        fee: '500',
        recipient: signerAddress,
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
        amountIn,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0
    };

    // Retrieve and log current WETH and USDC balances
    let wethBalance = await wethContract.balanceOf(signerAddress);
    let usdcBalance = await usdcContract.balanceOf(signerAddress);
    console.log(`WethBalance: ${hardhat.ethers.utils.formatUnits(wethBalance.toString(), 18)} | usdcBalance: ${hardhat.ethers.utils.formatUnits(usdcBalance.toString(), 6)}`);

    // Execute the swap and wait for transaction to be mined
    const tx = await pancakeRouterContract.connect(signer).exactInputSingle(params, { gasLimit: hardhat.ethers.utils.hexlify(1000000) });
    await tx.wait();
    console.log(tx);
    
    // Retrieve and log updated WETH and USDC balances after the swap
    wethBalance = await wethContract.balanceOf(signerAddress);
    usdcBalance = await usdcContract.balanceOf(signerAddress);
    console.log(`WethBalance: ${hardhat.ethers.utils.formatUnits(wethBalance.toString(), 18)} | usdcBalance: ${hardhat.ethers.utils.formatUnits(usdcBalance.toString(), 6)}`);
}

// Execute the main function
(async()=>{
    await executeTransaction();
})();
