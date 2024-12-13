import { TronWeb } from 'tronweb';  // Import the TronWeb library

// Configuration
const FULL_NODE = 'https://api.trongrid.io'; // Tron full node URL
const PRIVATE_KEY = ''; // Your private key

const WITHDRAW_ADDRESS = ''; // Address to send TRX
const AMOUNT_TO_WITHDRAW = 10000; // 0.01TRX // Amount in SUN (1 TRX = 1,000,000 SUN) 

// Initialize TronWeb
const tronWeb = new TronWeb({
    fullHost: FULL_NODE,
    privateKey: PRIVATE_KEY
});

async function withdrawTRX() {
    try {
        // Wallet address
        const address1 = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
        console.log(`Address : ${address1}`);
        // Check balance
        const balance = await tronWeb.trx.getBalance();
        console.log(`balance : ${balance/1e6} TRX`)
        if (balance < AMOUNT_TO_WITHDRAW) {
            console.log('Insufficient balance');
            return;
        }

        // Create transaction
        const tx = await tronWeb.transactionBuilder.sendTrx(WITHDRAW_ADDRESS, AMOUNT_TO_WITHDRAW, tronWeb.defaultAddress.base58);
        const signedTx = await tronWeb.trx.sign(tx);

        // Broadcast transaction
        const result = await tronWeb.trx.sendRawTransaction(signedTx);
        if (result.result) {
            console.log(`Transaction successful with hash: https://tronscan.org/#/transaction/${result.transaction.txID}`);
        } else {
            console.log('Transaction failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the withdrawal


async function monitorWallet() {
    setInterval(async () => {
      console.log("waiting for transaction");
      await withdrawTRX();
    }, 5000); // Check for new transactions every 5 seconds
  }
  
  // Run the monitor function
  monitorWallet();

// https://tronscan.org/#/transaction/cb9ad51eb2e88de3cd62321bd18c7160a34cb41a366b713ba04d5811f10fe97c
// https://tronscan.org/#/transaction/22eaa7db4d00a49aef23d36c0670dc6674aee98ce1062ab6e5017e8184e3554f
// https://tronscan.org/#/transaction/76ac104580a3ffebda576f1e5d150517b4db0a8783152f166ba0b6e3a12f9449
  
