const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/bsc_testnet_chapel');
const privateKey = '';

const wallet = new ethers.Wallet(privateKey, provider);

async function executeTransactions() {

    try {
         // Deposit transaction (sending Ether)
    const depositTx1 = {
        to: ethers.Wallet.createRandom(),
        value: ethers.parseEther("0.00001")
    };

    const depositTx2 = {
        to: ethers.Wallet.createRandom(),
        value: ethers.parseEther("0.00002")
    };

    const depositTx3 = {
        to: ethers.Wallet.createRandom(),
        value: ethers.parseEther("0.00003")
    }


    // Gas estimate for each transaction
    const depositTx1Estimate = await provider.estimateGas(depositTx1);
    const depositTx2Estimate = await provider.estimateGas(depositTx2);
    const depositTx3Estimate = await provider.estimateGas(depositTx3);

    // Get the current nonce for the wallet
    let nonce = await wallet.getNonce();

    // Create and sign the transactions
    const signedDepositTx1 = await wallet.sendTransaction({
        ...depositTx1,
        gasLimit: depositTx1Estimate,
        nonce: nonce,
    });

    const signedDepositTx2 = await wallet.sendTransaction({
        ...depositTx2,
        gasLimit: depositTx2Estimate,
        nonce: nonce + 1,
    });

    const signedDepositTx3 = await wallet.sendTransaction({
        ...depositTx3,
        gasLimit: depositTx3Estimate,
        nonce: nonce + 2,
    });

    console.log(`Deposit Tx 1 Hash: ${signedDepositTx1.hash}`);
    console.log(`Deposit Tx 2 Hash: ${signedDepositTx2.hash}`);
    console.log(`Deposit Tx 3 Hash: ${signedDepositTx3.hash}`);

    // Wait for transactions to be mined
    await signedDepositTx1.wait();
    await signedDepositTx2.wait();
    await signedDepositTx3.wait();

    console.log('All transactions completed in the same block!');
    } catch (error) {
        console.log(error);
    }
}

executeTransactions();

// Deposit Tx 1 Hash: 0x3adcd2b22674e388d01b79c6c141dffa7e14cff08da4b1c6e4411f15d59c1080
// Deposit Tx 2 Hash: 0xd0b99e0cf76e3e1a818772e155fb1e8da6d4b513a714d9e04fb1fdced6c30fa2
// Deposit Tx 3 Hash: 0x9e9177e465bfc5381992e6f5bb55636f95974250d1e241cac522fcf5cef12a12
// All transactions completed in the same block!

// "dependencies": {
//     "ethers": "^6.13.3"
//   }
