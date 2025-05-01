const StellarSdk = require("stellar-sdk");

// const server = new StellarSdk.Server("https://horizon.stellar.org");
// StellarSdk.Networks.PUBLIC;

const pair = StellarSdk.Keypair.random();

console.log(`Public key: ${pair.publicKey()}`);
console.log(`Secret key: ${pair.secret()}`);
