const { TronWeb } = require('tronweb');

const tronweb = new TronWeb({fullHost: 'https://api.trongrid.io'});

const main = async () => {
    const phrase = await tronweb.createRandom().mnemonic.phrase;
    const privateKey = await tronweb.createRandom().privateKey;
    const wallet = await tronweb.createRandom();

    console.log(`Seed phrase: ${phrase}`);
    console.log(`Private key: ${privateKey}`);
    console.log(wallet);
}

main();
