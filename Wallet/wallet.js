const ethers = require("ethers");

const entropy = ethers.randomBytes(16); // cryptographically secure random data.
const mnemonic = ethers.Mnemonic.entropyToPhrase(entropy); // Returns the seed phrase
const wallet = ethers.Wallet.fromPhrase(mnemonic); // Create a wallet for the mnemonic

console.log(entropy);
console.log(mnemonic);
console.log(wallet.address);
console.log(wallet.privateKey);

// "dependencies": {
//     "ethers": "^6.13.4"
//   }
