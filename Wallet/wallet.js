const ethers = require("ethers");
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org");

const entropy = ethers.randomBytes(16); // cryptographically secure random data.
const mnemonic = ethers.Mnemonic.entropyToPhrase(entropy); // Returns the seed phrase
const wallet = ethers.Wallet.fromPhrase(mnemonic, provider); // Create a wallet for the mnemonic
const signer = wallet.connect(provider);

console.log(entropy);
console.log(mnemonic);
console.log(wallet.address);
console.log(wallet.privateKey);
console.log(`Signer (connected with bsc node) : ${wallet.address}`);

// "dependencies": {
//     "ethers": "^6.13.4"
//   }
