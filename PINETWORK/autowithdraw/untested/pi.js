const StellarSdk = require('stellar-sdk');
const ed25519 = require('ed25519-hd-key');
const bip39 = require('bip39');
const axios = require('axios');
require("dotenv").config();

const LOCKUP_RELEASE_TIMESTAMP = new Date("2025-06-22T21:35:56Z").getTime(); // Your lockup release time UTC
const FEE_BUFFER = 1.5; // Leave a small amount for fees

async function getPiWalletAddressFromSeed(mnemonic) {
    if (!bip39.validateMnemonic(mnemonic)) throw new Error("Invalid mnemonic");
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const derivationPath = "m/44'/314159'/0'";
    const { key } = ed25519.derivePath(derivationPath, seed.toString('hex'));
    const keypair = StellarSdk.Keypair.fromRawEd25519Seed(key);
    return { publicKey: keypair.publicKey(), secretKey: keypair.secret() };
}

async function waitUntilLockupRelease() {
    const now = Date.now();
    const waitMs = LOCKUP_RELEASE_TIMESTAMP - now;
    if (waitMs > 0) {
        const seconds = Math.floor(waitMs / 1000);
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        console.log(`⏳ Waiting ${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} (HH:MM:SS) until lockup release...`);
        await new Promise(resolve => setTimeout(resolve, waitMs));
    } else {
        console.log("🔓 Lockup already released. Proceeding...");
    }
}

async function sendUnlockedPi() {
    const server = new StellarSdk.Server('https://api.mainnet.minepi.com');
    const mnemonic = process.env.MNEMONIC;
    const recipient = process.env.RECEIVER_ADDRESS;

    const wallet = await getPiWalletAddressFromSeed(mnemonic);
    const senderKeypair = StellarSdk.Keypair.fromSecret(wallet.secretKey);
    const senderPublic = wallet.publicKey;

    const account = await server.loadAccount(senderPublic);
    const baseFee = await server.fetchBaseFee();
    const fee = (baseFee * 2).toString();

    const res = await axios.get(`https://api.mainnet.minepi.com/accounts/${senderPublic}`);
    const balanceObj = res.data.balances.find(b => b.asset_type === 'native');

    const totalBalance = parseFloat(balanceObj.balance);
    const unlocked = totalBalance - FEE_BUFFER;

    if (unlocked <= 0) {
        console.log("⚠️ Not enough unlocked Pi to transfer.");
        return;
    }

    const amountToSend = unlocked.toFixed(7);

    console.log(`🚀 Transferring ${amountToSend} Pi to ${recipient}...`);

    const tx = new StellarSdk.TransactionBuilder(account, {
        fee,
        networkPassphrase: 'Pi Network',
    })
        .addOperation(StellarSdk.Operation.payment({
            destination: recipient,
            asset: StellarSdk.Asset.native(),
            amount: amountToSend,
        }))
        .setTimeout(30)
        .build();

    tx.sign(senderKeypair);

    try {
        const result = await server.submitTransaction(tx);
        console.log("✅ Transaction Sent!");
        console.log(`🔗 Tx Hash: ${result.hash}`);
        console.log(`🌐 View: https://api.mainnet.minepi.com/transactions/${result.hash}`);
    } catch (err) {
        console.error("❌ Transaction failed:", err.response?.data || err.message);
    }
}

(async () => {
    await waitUntilLockupRelease();
    await sendUnlockedPi();
})();
