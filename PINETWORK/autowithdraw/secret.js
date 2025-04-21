const bip39 = require('bip39');
const ed25519 = require('ed25519-hd-key');
const stellar = require('stellar-sdk');

async function getPiWalletAddressFromSeed(mnemonic) {
  // Validate seed phrase
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic");
  }

  // Get seed from mnemonic
  const seed = await bip39.mnemonicToSeed(mnemonic);

  // Pi Wallet (like Stellar) uses path m/44'/314159'/0'
  const derivationPath = "m/44'/314159'/0'";
  const { key } = ed25519.derivePath(derivationPath, seed.toString('hex'));

  // Create Stellar keypair from derived private key
  const keypair = stellar.Keypair.fromRawEd25519Seed(key);

  console.log("🚀 Public Key (Pi Wallet Address):", keypair.publicKey());
  console.log("🔑 Secret Key:", keypair.secret());
}

// Replace with your actual 24-word Pi seed phrase
const mnemonic = "";
getPiWalletAddressFromSeed(mnemonic);
