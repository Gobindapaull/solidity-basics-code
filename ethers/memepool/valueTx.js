require("dotenv").config();
const ethers = require("ethers");


const url = process.env.URL;
const provider = new ethers.JsonRpcProvider(url);

const PSAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const memepool = async () => {
  provider.on("pending", async (tx) => {
    const txInfo = await provider.getTransaction(tx);
    try {
      if (txInfo.value > 1n) {
        if (txInfo.to == PSAddress) {
            const amount = ethers.formatEther(txInfo.value)
            console.log("amount: ", amount)
            console.log("from address: ", txInfo.from)
            console.log("============================================================@autoboyt=======")
        }
      }
    } catch (error) {
      console.log("no data to show");
      console.log("==========================================================@autoboyt========")
    }
  });
};
memepool();
