const express = require('express');
const StellarSdk = require('stellar-sdk');
const ed25519 = require('ed25519-hd-key');
const bip39 = require('bip39');
const axios = require('axios');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const server = new StellarSdk.Server('https://api.mainnet.minepi.com');

async function getWalletFromSeed(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const { key } = ed25519.derivePath("m/44'/314159'/0'", seed.toString('hex'));
    const keypair = StellarSdk.Keypair.fromRawEd25519Seed(key);
    return { keypair, publicKey: keypair.publicKey(), secret: keypair.secret() };
}

let lastTx = {
    status: "Waiting...",
    balance: "0.0000000",
    amountSent: "0.0000000",
    txHash: null
};

async function autoWithdraw() {
    try {
        const mnemonic = process.env.MNEMONIC;
        const recipient = process.env.RECEIVER_ADDRESS;
        const wallet = await getWalletFromSeed(mnemonic);
        const senderPublic = wallet.publicKey;
        const senderKeypair = wallet.keypair;
        const account = await server.loadAccount(senderPublic);
        const baseFee = await server.fetchBaseFee();
        const fee = (baseFee * 2).toString();
        const res = await axios.get(`https://api.mainnet.minepi.com/accounts/${senderPublic}`);
        const balance = parseFloat(res.data.balances[0].balance);

        const withdrawAmount = balance - 2;
        if (withdrawAmount <= 0) {
            lastTx = {
                status: "⚠️ Not enough Pi to send.",
                balance: balance.toFixed(7),
                amountSent: "0.0000000",
                txHash: null
            };
            return;
        }

        const formattedAmount = withdrawAmount.toFixed(7).toString();
        const tx = new StellarSdk.TransactionBuilder(account, {
            fee,
            networkPassphrase: 'Pi Network',
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: recipient,
                asset: StellarSdk.Asset.native(),
                amount: formattedAmount,
            }))
            .setTimeout(30)
            .build();

        tx.sign(senderKeypair);
        const result = await server.submitTransaction(tx);

        lastTx = {
            status: "✅ Transaction Successful",
            balance: balance.toFixed(7),
            amountSent: formattedAmount,
            txHash: result.hash
        };

    } catch (err) {
        lastTx = {
            status: "❌ Error: " + (err.response?.data?.extras?.result_codes || err.message),
            balance: "0.0000000",
            amountSent: "0.0000000",
            txHash: null
        };
    }
}

setInterval(autoWithdraw, 499); // Every 10 seconds

// API Endpoint for frontend
app.get("/api/status", (req, res) => {
    res.json(lastTx);
});

app.listen(3000, () => {
    console.log("🚀 Bot running at http://localhost:3000");
});
