const { SuiClient, getFullnodeUrl } = require("@mysten/sui.js/client"); // "@mysten/sui.js": "^0.54.1"
const Ed25519Keypair = require("@mysten/sui.js/keypairs/ed25519");

const senderKeypair = Ed25519Keypair.Ed25519Keypair.deriveKeypair("");
const senderAddress = senderKeypair.toSuiAddress();
console.log(senderAddress); // 0xc956d2cca2dc16407d8f27fe8d8c176facbdb33aaee46941f1af646c779d9651
