const { SuiClient, getFullnodeUrl } = require("@mysten/sui.js/client");
const Ed25519Keypair = require("@mysten/sui.js/keypairs/ed25519");

const senderKeypair = Ed25519Keypair.Ed25519Keypair.generate();
const senderAddress = senderKeypair.toSuiAddress();
console.log(senderAddress);
