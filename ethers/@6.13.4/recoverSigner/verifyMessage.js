const ethers = require("ethers");

const message = "Sign it !!";
const signature = "0xb21a9e069b0101ddbc59cd05b93d82cc2873363fea8ac99213b4ac767bcc392a47e72880c8a9104358f4ef2f153f7f91ae6d7976bb8986f2cae4ffcff4b0e62a1b";

const recoveredAddress = ethers.verifyMessage(message, signature);

console.log(`Recovered signer address: ${recoveredAddress}`);

// Recovered signer address: 0x23F2Ef6661F368eB4CDF52DeC6002122Ee6A5bc3
