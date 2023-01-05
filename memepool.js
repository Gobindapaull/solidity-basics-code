const { ethers } = require("ethers");
const provider = new ethers.providers.WebSocketProvider(
  "wss://mainnet.infura.io/ws/v3/infuraid" // paste infura id
);

const uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

async function memepool() {
  provider.on("pending", async (tx) => {
    console.log('pending tx: ', tx);

    const txInfo = await provider.getTransaction(tx);
    console.log(txInfo);

    try {
      // 1 for ethereum
      console.log("chainId : ", txInfo.chainId);

      // null for pending tx
      console.log("blockNumber : ", txInfo.blockNumber);

      // from address
      console.log("from address : ", txInfo.from);

      // to address
      console.log("to address : ", txInfo.to);

      // gas Price
      console.log("gas price : ", ethers.utils.formatEther(txInfo.gasPrice));

      // gas Limit
      console.log("gas Limit : ", txInfo.gasLimit.toNumber());

      // value of pending tx
      console.log(ethers.utils.formatEther(txInfo.value));

    }

    catch {
      console.log("nothing to show");
    }

   //  filter uniswap/pancakeswap router pending tx
    try {
        if(txInfo.to == uniswapRouterAddress) {
            console.log(txInfo.from);
        }
    } catch {
        console.log('nothing to show');
    }
  });
}
memepool();

// to run the script
// npm run start
