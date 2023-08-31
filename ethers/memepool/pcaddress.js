require("dotenv").config();
const ethers = require("ethers");

const url = process.env.URL;
const privateKey = process.env.PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);

const PSAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const memepool = async () => {
  provider.on("pending", async (tx) => {
    // console.log(tx)
    const txInfo = await provider.getTransaction(tx);
    try {
      if (txInfo.to == PSAddress) {
        console.log(txInfo.from);
      }
      // console.log(txInfo.hash)
    } catch (error) {
      console.log("no data to show");
    }
  });
};
memepool();
