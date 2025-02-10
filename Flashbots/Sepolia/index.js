const { ethers } = require("ethers");
const { FlashbotsBundleProvider } = require("@flashbots/ethers-provider-bundle");
require("dotenv").config();

// 1. Setup Providers
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia");
const authSigner = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const flashbot = async () => {
    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, authSigner);

    const nonce = await provider.getTransactionCount(authSigner.address);
console.log("Wallet Nonce:", nonce);

    // 2. Prepare Transactions
    const tx1 = {
        nonce: nonce,
        to: "0x5BAa2Ff2696258ad36727dE8254B7d505600d333",
        value: ethers.utils.parseEther("0.0001"),
        gasLimit: 21000,
        gasPrice: ethers.utils.parseUnits("10", "gwei")
    };

    const tx2 = {
        nonce: nonce + 1,
        to: "0xdbd9730fA39880e8266Ed3B382adE15BC9A5FE28",
        value: ethers.utils.parseEther("0.000006"),
        gasLimit: 21000,
        gasPrice: ethers.utils.parseUnits("10", "gwei")
    };

    const tx3 = {
        nonce: nonce + 2,
        to: "0xFf64C6DE5DB92B06D5560553b98B4685DF6374bF",
        value: ethers.utils.parseEther("0.00001"),
        gasLimit: 21000,
        gasPrice: ethers.utils.parseUnits("10", "gwei")
    };

    // 3. Sign Transactions
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const signedTxs = await Promise.all([tx1, tx2, tx3].map(tx => wallet.sendTransaction(tx)));
    console.log(signedTxs);

    console.log("Tx Successful :)")
    // 4. Send Bundle to Flashbots
    const blockNumber = await provider.getBlockNumber();
    console.log(blockNumber+1);

}

flashbot();
