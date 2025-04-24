import { TronWeb } from 'tronweb';  // Import the TronWeb library

// Configuration
const FULL_NODE = 'https://api.trongrid.io'; // Tron full node URL
const PRIVATE_KEY = '6981bee7f9f000751f9caf2b3bc4efaec10ada4e56e5f77bcf2a95386503555d'; // Your private key

const WITHDRAW_ADDRESS = 'TWGdqTD4FFddF2qgt5N8pL5xDvfSVG3vab'; // Address to send TRX
const GAS_PRICE = 270000; // 0.01TRX // Amount in SUN (1 TRX = 1,000,000 SUN) 

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

        if (withdrawAmount <= 0) {
            console.log('Not enough TRX to withdraw after keeping minimum.');
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

// Run the withdrawal


async function monitorWallet() {
    setInterval(async () => {
        console.log("waiting for transaction");
        await withdrawTRX();
    }, 2000); // Check for new transactions every 2 seconds
}

// Run the monitor function
monitorWallet();

// telegram: @autoboyt

