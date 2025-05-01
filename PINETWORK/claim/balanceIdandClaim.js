const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('https://api.mainnet.minepi.com');
const senderSecret = ''; // YOUR SENDER SECRET
const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecret);
const senderPublic = senderKeypair.publicKey();

async function claimPi() {
    try {
        console.log('🔐 Sender Public Key:', senderPublic);

        // STEP 1: Check for claimable balances
        const balances = await server.claimableBalances().claimant(senderPublic).call();
        // console.log(balances)
        if (balances.records.length > 0) {
            const balanceId = balances.records[0].id;
            const amount = balances.records[0].amount;
            console.log('📥 Found Claimable Balance ID:', balanceId);
            console.log('📥 Found Claimable amount:', amount);

            // Load account
            const account = await server.loadAccount(senderPublic);

            let baseFee = await server.fetchBaseFee();
            baseFee *= 2; // double the fee
            const feeStr = baseFee.toString()

            // Build claim transaction
            const claimTx = new StellarSdk.TransactionBuilder(account, {
                fee: feeStr,
                networkPassphrase: 'Pi Network',
            })
                .addOperation(StellarSdk.Operation.claimClaimableBalance({
                    balanceId: balanceId,
                }))
                .setTimeout(30)
                .build();

            claimTx.sign(senderKeypair);
            const claimResult = await server.submitTransaction(claimTx);
            console.log('✅ Claimed Successfully! Hash:', claimResult);
        } else {
            console.log('ℹ️ No claimable balances found.');
        }
    } catch (e) {
        console.error('❌ Error:', e.response?.data?.extras?.result_codes || e.message || e);
    }
}

// Run every 1 seconds
setInterval(() => {
    claimPi();
}, 1000);
