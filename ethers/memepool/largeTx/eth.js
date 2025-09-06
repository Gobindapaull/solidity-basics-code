const ethers = require("ethers");
const provider = new ethers.JsonRpcProvider("https://eth.blockrazor.xyz");

const UNISWAP_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const ETH_THRESHOLD = ethers.parseEther("0.01");

const ABI = [
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)"
];

const iface = new ethers.Interface(ABI);
const selector = iface.getFunction("swapExactETHForTokens").selector;

console.log("🔍  Watching for large ETH → Token swaps ...");

provider.on("pending", async (txHash) => {
    try {
        const tx = await provider.getTransaction(txHash);
        if (!tx || !tx.to) return;

        if (tx.to.toLowerCase() === UNISWAP_ROUTER.toLowerCase()) {
            if (tx.data.startsWith(selector) && tx.value >= ETH_THRESHOLD ) {
                // const decoded = iface.decodeFunctionData("swapExactETHForTokens", tx.data);

                console.log(`🚨  Large swap detected!`);
                console.log(`From : ${tx.from}`);
                console.log(`ETH : ${ethers.formatEther(tx.value)} ETH`);
                console.log(`Tx: https://etherscan.io/tx/${txHash}`);
            }
        }
    } catch (error) {
        console.log(`Error : ${error}`);
    }
});
