const { SuiClient, getFullnodeUrl } = require("@mysten/sui.js/client");
const { TransactionBlock } = require("@mysten/sui.js/transactions");
const Ed25519Keypair = require("@mysten/sui.js/keypairs/ed25519");

const main = async () => {
    try {
        // Connect to the Sui Mainnet
        const client = new SuiClient({ url: getFullnodeUrl("mainnet") });

        // Put your seed phrase
        const senderKeypair = Ed25519Keypair.Ed25519Keypair.deriveKeypair("");
        const senderAddress = senderKeypair.toSuiAddress();
        console.log(senderAddress);
        // Fetch balance
        const balance = await client.getBalance({ owner: senderAddress });
        console.log(`SUI Balance: ${balance.totalBalance} SUI`);

        // Receiver address
        const receiverAddress = "0xc956d2cca2dc16407d8f27fe8d8c176facbdb33aaee46941f1af646c779d9651";
        // const amount = 1000000000; // 1 SUI
        const withdrawAmount = balance.totalBalance - 2000000;
        console.log("Withdraw Amount : ", withdrawAmount);

        if (withdrawAmount > 0) {
            const txb = new TransactionBlock();
            txb.setGasBudget(2000000); // Set gas budget

            const [coin] = txb.splitCoins(txb.gas, [txb.pure(withdrawAmount)]);

            txb.transferObjects(
                [coin], // Send gas as SUI
                txb.pure(receiverAddress),
            )


            // ✅ Sign and Execute Transaction
            const result = await client.signAndExecuteTransactionBlock({
                signer: senderKeypair,
                transactionBlock: txb,
            });

            console.log("✅ Transfer Successful!");
            console.log(`🔗 Transaction Hash: ${result.digest}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

setInterval(async () => {
    console.log("waiting for transaction");
    await main();
}, 1000); // Check for new transactions every 2 seconds

// https://suiscan.xyz/mainnet/tx/EKQS45fX2diqqXnLfFbNYVVNDUQe9Zdy48Ncae1tGv8M
//     "@mysten/sui.js": "^0.42.0",
