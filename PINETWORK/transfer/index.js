const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('https://api.mainnet.minepi.com');
const senderSecret = ''; // YOUR SENDER SECRET
const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecret);
const senderPublic = senderKeypair.publicKey();
const recipient = 'GD4W63ET2MKYFSLNZMURXLBXJF6LOCDUDE2H6W27G7HPNDKC4VUV5FZZ';

(async () => {
    try {
        console.log('🔐 Sender Public Key:', senderPublic);
        const account = await server.loadAccount(senderPublic);
        const fee = await server.fetchBaseFee();

        const tx = new StellarSdk.TransactionBuilder(account, {
            fee,
            networkPassphrase: 'Pi Network',
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: recipient,
                asset: StellarSdk.Asset.native(),
                amount: '5',
            }))
            .setTimeout(30)
            .build();

        tx.sign(senderKeypair);
        const result = await server.submitTransaction(tx);
        console.log('✅ Sent! Tx hash:', result);
    } catch (e) {
        console.error('❌ Error:', e.response?.data?.extras?.result_codes || e);
    }
})();
