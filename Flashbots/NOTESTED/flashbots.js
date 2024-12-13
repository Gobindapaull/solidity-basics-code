const { ethers } = require("ethers");
const { FlashbotsBundleProvider } = require("@flashbots/ethers-provider-bundle");
const ABI = require("./ABI.json");

const FLASHBOTS_RELAY = "https://relay.flashbots.net";
const PRIVATE_KEY = "0x2f8987780eb8fbdf648a83fcd7dd2eaf35a1707f4fd2bd4fad822dd97a32511c";
const SAFE_WALLET_PRIVATE_KEY = "0xe5949d085f0b4549fc10517663bf0567b653468ea7a38e63e92e7081e9bf6151";

async function claimTokens() {
    // set up providers and wallets
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");

    const compromisedWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log(`Compromised Wallet address : ${compromisedWallet.address}`)

    const safeWallet = new ethers.Wallet(SAFE_WALLET_PRIVATE_KEY, provider);
    console.log(`Safe Wallet address : ${safeWallet.address}`);

    // Flashbots provider
    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, safeWallet, FLASHBOTS_RELAY);

    // Token transfer parameters
    const tokenContractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT TOKEN
    const recipientAddress = safeWallet.address;
    const amount = ethers.parseUnits("100", 18);

    // Token Instance
    const tokenContract = new ethers.Contract(tokenContractAddress, ABI, compromisedWallet);


    // Build the transaction
    const transaction = await tokenContract.transfer(recipientAddress, amount);
    transaction.nonce = await provider.getTransactionCount(compromisedWallet.address);
    transaction.gasLimit = 100000;
    transaction.gasPrice = ethers.parseUnits("30", "gwei");

    // Sign the transaction
    const signedTransaction = await compromisedWallet.signTransaction(transaction);

    // Create and send the Flashbots bundle
    const bundleResponse = await flashbotsProvider.sendBundle(
        [{signedTransaction}],
        await provider.getBlockNumber + 1
    );

    // wait for bundle inclusion
    const resolution = await bundleResponse.wait();
    if (resolution === 0) {
        console.log(`Bundle included, token reclaimed`);
    } else {
        console.log(`Bundle not included, Try adjusting gas price or timing`);
    }

}

claimTokens().catch(console.error);

// "dependencies": {
//     "@flashbots/ethers-provider-bundle": "^1.0.0",
//     "ethers": "^6.13.4"
//   }
