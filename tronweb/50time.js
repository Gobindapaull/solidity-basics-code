import { TronWeb } from 'tronweb';  // Import the TronWeb library

// Configuration
const FULL_NODE = 'https://rpc.ankr.com/premium-http/tron/<api_key>'; // Tron full node URL
const PRIVATE_KEY = ''; // Your private key

const WITHDRAW_ADDRESS = 'TSkaZaUqGU7b5EoQ9cgkZFWjEaDxZYwc71'; // Address to send TRX
const GAS_PRICE = 2000000;

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
        console.log(`balance : ${balance / 1e6} TRX`)

        const withdrawAmount = balance - GAS_PRICE;
        console.log(`Withdraw amount : ${withdrawAmount / 1e6} TRX`);

        if (balance < withdrawAmount) {
            console.log('Insufficient balance');
            return;
        }

        // Create transaction
        const tx = await tronWeb.transactionBuilder.sendTrx(WITHDRAW_ADDRESS, withdrawAmount, tronWeb.defaultAddress.base58);
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

setInterval(async () => {
    console.log("waiting for transaction");
    await withdrawTRX();
}, 50); // Check for new transactions every .05 seconds

// telegram: @autoboyt

