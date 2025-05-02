const StellarSdk = require('stellar-sdk');
const axios = require('axios');

const server = new StellarSdk.Server('https://api.mainnet.minepi.com');

const senderSecret = 'SDTHEWHZY2O63Q7TL4ZT4C7XSSYBZ3UOHHSFUNWCJZNLXN23JLIUZL';
const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecret);
const senderPublic = senderKeypair.publicKey();

const apiUrl = `https://api.mainnet.minepi.com/accounts/${senderPublic}`;
const recipient = 'GB2RKMV7GHGFSSIDQSVUZXZ4IEFDD2EPWA6V4FBH3ERGVZEZSWPEOJPP';

async function sendPi() {
  try {
    console.log('🔐 Sender:', senderPublic);

    const account = await server.loadAccount(senderPublic);
    
    const baseFee = await server.fetchBaseFee();
    const fee = (baseFee * 2).toString(); // Dynamically doubled gas fee
    console.log(`⛽ Base Fee: ${baseFee}, Doubled Fee: ${fee}`);

    const res = await axios.get(apiUrl);
    const balance = res.data.balances[0].balance;
    console.log(`Pi Balance: ${balance}`);

    const withdrawAmount = Number(balance) - 2;
    if (withdrawAmount <= 0) {
      console.log("⚠️ Not enough Pi to send. Skipping...");
    } else {
      const formattedAmount = withdrawAmount.toFixed(7).toString();
      console.log(`➡️ Sending: ${formattedAmount} Pi`);

      // Dynamic timeout based on network conditions (ledger closed time)
      const ledgers = await server.ledgers().order('desc').limit(1).call();
      const latestLedger = ledgers.records[0];
      const networkLatency = latestLedger.closed_at ? (Date.now() - new Date(latestLedger.closed_at)) / 1000 : 0;

      // Dynamic timeout: 5s minimum, up to 15s if latency is high
      const timeoutSeconds = Math.min(15, Math.max(5, Math.ceil(networkLatency + 2)));
      console.log(`⏱️ Setting timeout to ${timeoutSeconds} seconds`);

      const tx = new StellarSdk.TransactionBuilder(account, {
        fee,
        networkPassphrase: 'Pi Network',
      })
        .addOperation(StellarSdk.Operation.payment({
          destination: recipient,
          asset: StellarSdk.Asset.native(),
          amount: formattedAmount,
        }))
        .setTimeout(timeoutSeconds) // Set dynamic timeout
        .build();

      tx.sign(senderKeypair);

      const result = await server.submitTransaction(tx);
      console.log("✅ Tx Hash:", result.hash);
      console.log(`🔗 View Tx: https://api.mainnet.minepi.com/transactions/${result.hash}`);
    }
  } catch (e) {
    console.error('❌ Error:', e.response?.data?.extras?.result_codes || e.message || e);
  } finally {
    setTimeout(sendPi, 999); // Run again after 999 ms
  }
}

sendPi(); // Start the loop
