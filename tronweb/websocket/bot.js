const TronWeb = require('tronweb');
const WebSocket = require('ws');

// TronWeb Configuration
const FULL_NODE = 'https://api.trongrid.io'; // TronGrid full node URL
const PRIVATE_KEY = ''; // Your private key
const WITHDRAW_ADDRESS = 'TSkaZaUqGU7b5EoQ9cgkZFWjEaDxZYwc71'; // Withdrawal address
const GAS_PRICE = 2000000; // Estimated gas price in SUN

// Initialize TronWeb
const tronWeb = new TronWeb({
    fullHost: FULL_NODE,
    privateKey: PRIVATE_KEY,
});

// WebSocket Configuration
const WEBSOCKET_URL = 'wss://api.trongrid.io/v1/events?apikey=<your-api-key>'; // Replace with your TronGrid API key
const socket = new WebSocket(WEBSOCKET_URL);

// Function to withdraw TRX
async function withdrawTRX() {
    try {
        const balance = await tronWeb.trx.getBalance();
        console.log(`Balance: ${balance / 1e6} TRX`);

        const withdrawAmount = balance - GAS_PRICE; // Subtract gas fee
        if (withdrawAmount <= 0) {
            console.log('Insufficient balance to withdraw.');
            return;
        }

        // Create transaction
        const tx = await tronWeb.transactionBuilder.sendTrx(WITHDRAW_ADDRESS, withdrawAmount, tronWeb.defaultAddress.base58);
        const signedTx = await tronWeb.trx.sign(tx);

        // Broadcast transaction
        const result = await tronWeb.trx.sendRawTransaction(signedTx);
        if (result.result) {
            console.log(`Withdrawal successful: https://tronscan.org/#/transaction/${result.transaction.txID}`);
        } else {
            console.log('Transaction failed:', result);
        }
    } catch (error) {
        console.error('Error during withdrawal:', error);
    }
}

// WebSocket Event Listeners
socket.on('open', () => {
    console.log('WebSocket connection established.');

    // Subscribe to events (e.g., transfers to your wallet)
    const subscribeMessage = {
        eventFilter: {
            address: tronWeb.defaultAddress.base58, // Listen for events related to your address
        },
        type: 'subscribe',
    };

    socket.send(JSON.stringify(subscribeMessage));
    console.log('Subscribed to events.');
});

socket.on('message', async (message) => {
    try {
        const event = JSON.parse(message);
        console.log('Event received:', event);

        // Trigger withdrawal if a specific condition is met
        if (event && event.result && event.result.event_name === 'transfer') {
            console.log('Transfer event detected.');
            await withdrawTRX();
        }
    } catch (error) {
        console.error('Error processing WebSocket message:', error);
    }
});

socket.on('close', () => {
    console.log('WebSocket connection closed.');
});

socket.on('error', (error) => {
    console.error('WebSocket error:', error);
});
