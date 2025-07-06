const stellar = require("@stellar/stellar-sdk");

const server = new stellar.Horizon.Server("https://api.mainnet.minepi.com");

const senderSecret = "SDYVMIGOQE4PCJLVPO3T5IFNR75GOLTDQDO3W433IBJTUCBV2RAK2F2Y";
const receiverPublicKey = "GCB42CQEH5NM7RV7ZAV3BZTGFHD7YIIAQXL2BJHMJAMMK5TT3E52XFBT";

const senderKeypair = stellar.Keypair.fromSecret(senderSecret);
const senderPublic = senderKeypair.publicKey();
console.log(`Sender public key : ${senderPublic}`);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function claimAndTransfer() {
    while (true) {
        try {
            // STEP 1: Claim all claimable balances
            console.log(`🔍 Checking claimable balances...`);
            const balances = await server.claimableBalances().claimant(senderPublic).call();

            if (balances.records.length === 0) {
                console.log(`⏳ No claimable balances. Waiting 1s...`);
                await delay(10);
                continue;
            }

            for (const balance of balances.records) {
                const balanceId = balance.id;
                console.log(`✅ Claimable balance found: ${balanceId}`);

                const account = await server.loadAccount(senderPublic);

                const tx = new stellar.TransactionBuilder(account, {
                    fee: stellar.BASE_FEE,
                    networkPassphrase: stellar.Networks.PUBLIC,
                })
                    .addOperation(stellar.Operation.claimClaimableBalance({ balanceId }))
                    .setTimeout(30)
                    .build();

                tx.sign(senderKeypair);
                const result = await server.submitTransaction(tx);
                console.log(`🎉 Claimed! Tx hash: ${result.hash}`);
            }

            // STEP 2: Check sender balance and auto-send
            const updatedAccount = await server.loadAccount(senderPublic);
            const nativeBalance = updatedAccount.balances.find(b => b.asset_type === "native");

            const balanceAmount = parseFloat(nativeBalance?.balance || "0");

            if (balanceAmount > 0.1) { // Keep a little for fees
                const sendAmount = (balanceAmount - 0.05).toFixed(7); // Safe margin

                const tx = new stellar.TransactionBuilder(updatedAccount, {
                    fee: stellar.BASE_FEE,
                    networkPassphrase: stellar.Networks.PUBLIC,
                })
                    .addOperation(stellar.Operation.payment({
                        destination: receiverPublicKey,
                        asset: stellar.Asset.native(),
                        amount: sendAmount
                    }))
                    .setTimeout(30)
                    .build();

                tx.sign(senderKeypair);
                const result = await server.submitTransaction(tx);
                console.log(`🚀 Transferred ${sendAmount} PI to ${receiverPublicKey}. Tx hash: ${result.hash}`);
            } else {
                console.log(`💰 Balance too low to transfer. Current: ${balanceAmount} PI`);
            }

        } catch (err) {
            console.error("❌ Error:", err.response?.data || err.message || err);
        }

        console.log("⏳ Waiting 1 seconds before next check...\n");
        await delay(499);
    }
}

claimAndTransfer();
