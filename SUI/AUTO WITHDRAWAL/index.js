const { SuiClient, getFullnodeUrl } = require("@mysten/sui.js/client");
const Ed25519Keypair = require("@mysten/sui.js/keypairs/ed25519");

const main = async () => {
    try {
        // Connect to the Sui Mainnet
        const client = new SuiClient({ url: getFullnodeUrl("mainnet") });

        const senderKeypair = Ed25519Keypair.Ed25519Keypair.deriveKeypair("");
        const senderAddress = senderKeypair.toSuiAddress();
        console.log(senderAddress); // 0xc956d2cca2dc16407d8f27fe8d8c176facbdb33aaee46941f1af646c779d9651
        // Fetch balance
        const balance = await client.getBalance({ owner: senderAddress });
        console.log(`SUI Balance: ${balance.totalBalance} SUI`);

        const receiverAddress = "0x672daf174f3b1de0bc3ef34d6faf48aa409879e651c29b7e4cf548ba66957709";
        const amount = 1000000000; // 1 SUI


        // ✅ Transfer SUI
        if (balance > 0) {
            const tx = await client.signAndExecuteTransactionBlock({
                signer: senderKeypair,
                transactionBlock: {
                    kind: "paySui",
                    data: {
                        inputCoins: [], // Automatically selects coins
                        recipients: [receiverAddress],
                        amounts: [amount],
                        gasBudget: 10000000, // Set a sufficient gas budget
                    },
                },
            });
            console.log("✅ Transfer Successful!");
            console.log(`🔗 Transaction Hash: ${tx.digest}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

setInterval(async () => {
    console.log("waiting for transaction");
    await main();
}, 1000); // Check for new transactions every 2 seconds
