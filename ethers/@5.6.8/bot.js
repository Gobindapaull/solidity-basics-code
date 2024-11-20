const { ethers } = require("ethers");
const { BigNumber, utils } = ethers;

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org"
);

const phrase = "symbol scrap potato rapid amateur toast verify blind exile employ denial penalty"
const fromPhrasee = new ethers.Wallet.fromMnemonic(phrase)

// console.log(fromPhrasee.privateKey)
const addressReceiver = "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD"; // here your receiver address
const privateKeys = [
  fromPhrasee.privateKey
]; // privatekey of the wallet
// 0x6d36dF5fD5e162e692C4772B21C3B52EB33F353E

const bot = async () => {

  provider.on("block", async (e) => {

    console.log("Listening new block, waiting..)");
    console.log(`Block Number : ${e}`);

    for (let i = 0; i < privateKeys.length; i++) {
      const _target = new ethers.Wallet(privateKeys[i]);
      const target = _target.connect(provider);
      const balance = await provider.getBalance(target.address);
      console.log("Wallet balance: ", ethers.utils.formatEther(balance));

      const gasLimit = 21001; // default 21000
      const gasPrice = await provider.getGasPrice();
      console.log(`GWEI : ${gasPrice / 1e9}`)

      const maxGasFee = BigNumber.from(gasLimit).mul(gasPrice);
      console.log("Tx gas price: ", ethers.utils.formatEther(maxGasFee));

      if (balance.sub(maxGasFee) > 0) {
        console.log("NEW ACCOUNT WITH ETH!");
        const amount = balance.sub(maxGasFee);
        try {
          await target.sendTransaction({
            to: addressReceiver,
            value: amount,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
          });
          console.log(
            `Success! transfered --> ${ethers.utils.formatEther(balance)}`
          );
        } catch (e) {
          console.log(`error: ${e}`);
        }
      }
    }
  });
};

bot();
