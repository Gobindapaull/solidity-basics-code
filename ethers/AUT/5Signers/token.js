const ethers = require('ethers');
const { BigNumber } = ethers;
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const tokenAddress = process.env.TOKEN_ADDRESS;
const tokenABI = require("./ABI.json");

const signerKeys = [
    process.env.PRIVATE_KEY,
    process.env.PRIVATE_KEY1,
    process.env.PRIVATE_KEY2,
    process.env.PRIVATE_KEY3,
    process.env.PRIVATE_KEY4,
];

// Create 5 signers
const signers = signerKeys.map(pk => new ethers.Wallet(pk, provider));

// Log signer addresses
signers.forEach((s, i) => console.log(`Signer${i}: ${s.address}`));

// Create token instances for each signer
const tokenContracts = signers.map((s) => new ethers.Contract(tokenAddress, tokenABI, s));

const addresses = signers.map(s => s.address);
const to = process.env.RECEIVER_ADDRESS;

provider.on("block", async (blockNumber) => {
    console.log(`Block number: ${blockNumber}`);

    for (let i = 0; i < addresses.length; i++) {

        const addr = addresses[i];
        const token = tokenContracts[i];

        const balance = await token.balanceOf(addr);
        console.log(`USDT balance of ${addr}: ${balance / 1e18}`);

        if (balance.gt(0)) {
            try {
                const gasPrice = await provider.getGasPrice();
                console.log(`Gas Price: ${gasPrice / 1e9} gwei`);

                const gasLimit = 63078;

                const tx = await token.transfer(to, balance, {
                    gasPrice,
                    gasLimit
                });

                const receipt = await tx.wait();
                console.log(`Transfer success from ${addr} | Hash: ${receipt.hash}`);

            } catch (error) {
                console.log(`Error for ${addr}:`, error);
            }
        }
    }
});
