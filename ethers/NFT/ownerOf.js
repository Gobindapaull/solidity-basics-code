const ethers = require("ethers");

const ABI = require("./abi.json");

const privateKey = "0x9c0eaf198457ba4ca1e202864b9b39af50fbfe081a3da4280c3c007f9878687c";
const url = "https://1rpc.io/base";
const tokenAddress = "0x6c6cd82aE7ee4CC87CE1662568A9C6240D68eC02";

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider);
const tokenContract = new ethers.Contract(tokenAddress, ABI, signer);

const start = async () => {

  const name = await tokenContract.name();
  console.log("Name : ", name);

  const totalSupply = await tokenContract.totalSupply()
  console.log("totalSupply : ", totalSupply)

  for (let index = 1; index < totalSupply; index++) {
    const ownerOf = await tokenContract.ownerOf(index)
    console.log(`ownerOf id ${index}: ${ownerOf}`)
  }
}

start();
