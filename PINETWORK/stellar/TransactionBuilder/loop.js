const stellar = require("@stellar/stellar-sdk");
const server = new stellar.Horizon.Server("https://api.mainnet.minepi.com");

const senderSecret = "SDYVMIGOQE4PCJLVPO3T5IFNR75GOLTDQDO3W433IBJTUCBV2RAK2F2Y";
const senderKeypair = stellar.Keypair.fromSecret(senderSecret);
const senderPublic = senderKeypair.publicKey();
console.log(`Sender public key : ${senderPublic}`); // GC7MUB23HZAKEG72XIVATEJ34HD72PUMZRNDX4EQS6LSS4DVXDUJ6M7G

async function claimPI() {
    while (true) {
        try {
            // Load all claimable balances
            const balances = await server.claimableBalances().claimant(senderPublic).call();
            if (balances.records.length === 0) {
                console.log(`No claimable balances found.`);
                await new Promise((resolve) => setTimeout(resolve, 499));
            }
            for (const balance of balances.records) {
                const balanceId = balance.id;
                console.log(`Claimable balance found : ${balanceId}`);
                // Load account
                const account = await server.loadAccount(senderPublic);
                // Build transaction
                const tx = new stellar.TransactionBuilder(account, {
                    fee: stellar.BASE_FEE,
                    networkPassphrase: stellar.Networks.PUBLIC
                }).addOperation(stellar.Operation.claimClaimableBalance({
                    balanceId: balanceId
                })).setTimeout(30).build();
                // Sign and submit
                tx.sign(senderKeypair);
                const result = await server.submitTransaction(tx);
                console.log(`Claimed! Tx hash : ${result.hash}`);
            }
            console.log(`Run again ....`);
            await new Promise((resolve) => setTimeout(resolve, 499));
        } catch (error) {
            console.log(error);
            await new Promise((resolve) => setTimeout(resolve, 499));
        }
    }
}

claimPI();
