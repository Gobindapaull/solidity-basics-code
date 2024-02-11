const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org"
);

const tokenAddress = "0x09b4e3380C73fFEe7B24641AF799F5b0d41cdB1f";
const tokenABI = require("./abi.json");
const privateKey =
  "";
const receiver = "";

const signer = new ethers.Wallet(privateKey, provider);
console.log(`signer : ${signer.address}`);

const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

const bot = async () => {
  const addresses = [""];
  const to = tokenAddress;

  provider.on("block", async () => {

    for (let i = 0; i < addresses.length; i++) {

      const balance = await tokenContract.released(to);
      console.log(balance)

      if (balance.gt(0)) {

        try {
          const gasPrice = await provider.getGasPrice();
          console.log(`gas Price : ${gasPrice / 1e9} gwei`);

          const estimation = await tokenContract.estimateGas.release(to);
          console.log(`gas estimate : ${estimation}`);

          // Release tx first

          const tx1 = await tokenContract.release(to, {
            gasPrice: gasPrice,
            gasLimit: 76000,
          });

          // Balance Check

          const bal = await provider.getBalance(signer);
          const balance = ethers.formatEther(bal);
          console.log("BNB balance: ", balance);

          const txx = {
            to: receiver,
            value: bal
        }
        // Transfer BNB Second Tx
          const tx2 = await signer.sendTransaction(txx);

          const tx = await tx1.wait();
          const bnbTx = await tx2.wait();

          console.log(`${tx1.hash}`);
          console.log(`${bnbTx.hash}`);

        } catch (error) {
          console.log(error);
        }
      }
    }
  });
};

bot();
