const { Connection, PublicKey } = require("@solana/web3.js");

// Your Specific Token Address (Replace with your token's mint address)
const YOUR_TOKEN_MINT = new PublicKey("9FmBY2WQGAajEGX8i3CP7WWy6HpbepUEhfNAFmpNYAPR"); 

// RPC Connection (Use private RPC for better performance)
const RPC_URL = "https://mainnet.helius-rpc.com/?api-key=";
const connection = new Connection(RPC_URL, "confirmed");

// Raydium AMM Program (Latest AMM)
const RAYDIUM_AMM_PROGRAM = new PublicKey("CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C");

console.log(`Monitoring buys for token: ${YOUR_TOKEN_MINT.toBase58()} on Raydium...`);

// Subscribe to transaction logs
connection.onLogs(RAYDIUM_AMM_PROGRAM, async (logs, context) => {
    if (logs.err) return;

    const txSignature = logs.signature;
    console.log(`🔍 New Swap Detected: ${txSignature}`);

    // Fetch full transaction details
    let tx = await connection.getTransaction(txSignature, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0, // Support latest tx version
    });

    if (!tx || !tx.meta || !tx.transaction) {
        console.log("❌ Transaction data is missing or incomplete.");
        return;
    }

    const message = tx.transaction.message;
    const postTokenBalances = tx.meta.postTokenBalances; // Token balances after swap

      // Ensure transaction has valid account keys
      if (!message || !message.accountKeys || message.accountKeys.length === 0) {
        console.log("❌ No valid account keys found in transaction.");
        return;
    }

    // Ensure transaction has token balance changes
    if (!postTokenBalances || postTokenBalances.length === 0) return;

    // Check if the transaction involved our token
    for (let balance of postTokenBalances) {
        if (balance.mint === YOUR_TOKEN_MINT.toBase58()) {
            console.log("✅ New Buy Order Detected!");
            console.log(`Buyer: ${message.accountKeys[0].toBase58()}`);
            console.log(`Token Purchased: ${balance.mint}`);
            console.log(`Amount: ${balance.uiTokenAmount.uiAmount} ${balance.uiTokenAmount.decimals}`);
        }
    }
});
