const ethers = require("ethers");
const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");

const address = "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5";

const privateKey =  ethers.Wallet.createRandom().privateKey;
console.log(privateKey);

const checkSumAddress = ethers.getAddress(address);
console.log(checkSumAddress);
