require("dotenv").config();
const ethers = require("ethers");

const ABI = require("./abi.json");

const privateKey = process.env.PRIVATE_KEY;
const url = process.env.URL;
const tokenAddress = process.env.tokenAddress;

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);
const tokenContract = new ethers.Contract(tokenAddress, ABI, signer);

const receivers = [
  "0xd3cca77cd6dc2794f431ae435323dbe6f9bd82c3",
  "0xd0b53c43d3e0b58909c38487aa0c3af7dfa2d8c0",
  "0x6b1959e70303e334d7cb577222c6296bc132faed",
  "0x55dd63507b66b54fc0568f01b6479ed0dba78013",
  "0x140f4ae878e14d43eae76757d0aa6fb245110b94",
];

const amount = 2000000000000000000000n;

const start = async () => {
  const name = await tokenContract.name();
  console.log("token name: ", name);

    for (let j = 0; j < receivers.length; j++) {
      const receiver = receivers[j];
      console.log(receiver);

      const transfe = await tokenContract.transfer(receiver, amount);
      const transfer = await transfe.wait();
      
      console.log("Tx hash: ", transfer.hash);
      console.log(`transfer ${amount} tokens`);
    }
};
start();
