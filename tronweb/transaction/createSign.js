const { TronWeb } = require('tronweb');

const tronweb = new TronWeb({fullHost: 'https://api.trongrid.io'});

const receiverAddress = "TAsKDhd1Nk2hmSmrCkJYBrBcabNA1Z9SnV";

const main = async () => {
    // Create a wallet and private key
    const wallet = await tronweb.createRandom();
    const privateKey = wallet.privateKey.replace(/^0x/, ""); // remove 0x

    console.log(wallet);
    console.log(`Seed phrase: ${wallet.mnemonic.phrase}`);
    console.log(`Private key: ${privateKey}`);
    console.log(`wallet address: ${wallet.address}`);

    // Create a transaction
    const tx = await tronweb.transactionBuilder.sendTrx(receiverAddress, 1000, wallet.address);
    console.log(tx)

    // Sign transaction
    const signedTx = await tronweb.trx.sign(tx, privateKey);
    console.log(signedTx);
}

main();
