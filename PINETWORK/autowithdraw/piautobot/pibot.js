const StellarSdk = require('stellar-sdk');
const ed25519 = require('ed25519-hd-key');
const bip39 = require('bip39');
const axios = require('axios');
require("dotenv").config();

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
    const keypair = StellarSdk.Keypair.fromRawEd25519Seed(key);

    const publicKey = keypair.publicKey();
    const secretKey = keypair.secret();

    console.log("🚀 Public Key (Sender Pi Wallet Address):", keypair.publicKey());

    return { publicKey, secretKey };
}

async function sendPi() {
    const server = new StellarSdk.Server('https://api.mainnet.minepi.com');
    const mnemonic = process.env.MNEMONIC;
    const recipient = process.env.RECEIVER_ADDRESS;
    const wallet = await getPiWalletAddressFromSeed(mnemonic);
    const senderSecret = wallet.secretKey;
    const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecret);
    const senderPublic = wallet.publicKey;
    const apiUrl = `https://api.mainnet.minepi.com/accounts/${senderPublic}`;
    try {
        // console.log('🔐 Sender:', senderPublic);

        const account = await server.loadAccount(senderPublic);

        const baseFee = await server.fetchBaseFee();
        const fee = (baseFee * 2).toString(); // Dynamically doubled gas fee
        console.log(`⛽ Base Fee: ${baseFee / 1e7}, Doubled Fee: ${fee / 1e7}`);

        const res = await axios.get(apiUrl);
        const balance = res.data.balances[0].balance;
        console.log(`Pi Balance: ${balance}`);

        const withdrawAmount = Number(balance) - 2;
        if (withdrawAmount <= 0) {
            console.log("⚠️ Not enough Pi to send. Skipping...");
            console.log(`-------------------------------------------------------------------------------------`)
        } else {
            const formattedAmount = withdrawAmount.toFixed(7).toString();
            console.log(`➡️ Sending: ${formattedAmount} Pi`);

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

            if (result && result.transaction_hash !== false) {
                console.log("✅ Tx Hash:", result);
                console.log(`🔗 View Tx: https://api.mainnet.minepi.com/transactions/${result.hash}`);
                console.log(`-------------------------------------------------------------------------------------`)
            } else {
                console.log("⚠️ Transaction submitted but not confirmed successful:", result);
                console.log(`-------------------------------------------------------------------------------------`)
            }
        }
    } catch (e) {
        console.error('❌ Error:', e.response?.data?.extras?.result_codes || e.message || e);
        console.log(`-------------------------------------------------------------------------------------`)
    } finally {
        setTimeout(sendPi, 499); // Run again after 999 ms
    }
}

sendPi(); // Start the loop



// PI auto withdraw bot
// telegram: @autoboyt
