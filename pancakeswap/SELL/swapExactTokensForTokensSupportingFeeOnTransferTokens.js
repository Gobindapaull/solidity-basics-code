const ethers = require("ethers");

// Configuration
const providerUrl = 'https://bsc-dataseed.binance.org';
const privateKey = '';
const tokenAddress = '0x3e81Aa8d6813Ec9D7E6ddB4e523fb1601a0e86F3';
const dexAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
const USDT = "0x55d398326f99059fF775485246999027B3197955";
const amountToSell = ethers.parseUnits('2.913', 18);

// Create provider and wallet
const provider = new ethers.JsonRpcProvider(providerUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// ERC20 Token ABI
const erc20Abi = require("./ABI.json");

// DEX ABI
const dexAbi = require("./DexABI.json");

// Create contract instances
const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, wallet);
const dexContract = new ethers.Contract(dexAddress, dexAbi, wallet);

async function sellTokens() {
    try {
        // Check balance
        const balance = await tokenContract.balanceOf(wallet.address);
        console.log(`Current Token Balance: ${ethers.formatUnits(balance, 18)} tokens`);

        // Check if we have enough tokens
        if (balance < amountToSell) {
            console.log('Insufficient token balance for sale.');
            return;
        }

        // Approve the DEX to spend the tokens
        const approveTx = await tokenContract.approve(dexAddress, amountToSell);
        await approveTx.wait();
        console.log('Tokens approved for sale.');

        // Prepare the swap path (Token -> ETH)
        const path = [tokenAddress, USDT]; // Assuming you're swapping to ETH

        // Execute the swap
        const amountOutMin = 0; // Set slippage tolerance as needed
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

        const swapTx = await dexContract.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amountToSell,
            amountOutMin,
            path,
            wallet.address,
            deadline
        );

        const tx = await swapTx.wait();
        console.log('Tokens sold successfully.');
        console.log(`Tx hash : ${tx.hash}`);
        console.log(`Transaction was mined in block: ${tx.blockNumber}`);
    } catch (error) {
        console.error('Error selling tokens:', error);
    }
}

// Run the sell function
sellTokens();
