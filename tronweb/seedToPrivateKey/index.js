const TronWeb = require('tronweb');
const bip39 = require('bip39');
const crypto = require('crypto');



async function mnemonicToPrivateKey(seedPhrase) {
    // Validate the seed phrase
    if (!bip39.validateMnemonic(seedPhrase)) {
        throw new Error('Invalid seed phrase');
    }

    // Convert mnemonic to seed
    const seed = await bip39.mnemonicToSeed(seedPhrase);

    // Derivation path for Tron: m/44'/195'/0'/0/0
    const path = [44, 195, 0, 0, 0].map(index => index + 0x80000000); // Hardened indices

    // Perform key derivation manually using HMAC-SHA512
    let privateKey = seed;
    let chainCode = seed.slice(32);

    for (const index of path) {
        const indexBuffer = Buffer.allocUnsafe(4);
        indexBuffer.writeUInt32BE(index, 0);

        const data = Buffer.concat([
            Buffer.alloc(1, 0), // Parent public key placeholder (set to 0)
            privateKey.slice(0, 32), // Parent private key
            indexBuffer, // Index as a 32-bit unsigned integer
        ]);

        const hmac = crypto.createHmac('sha512', chainCode).update(data).digest();
        privateKey = hmac.slice(0, 32);
        chainCode = hmac.slice(32);
    }

    // Return the first 32 bytes as the private key
    return privateKey.toString('hex');
}

(async () => {
    const seedPhrase = "";

    try {
        const privateKey = await mnemonicToPrivateKey(seedPhrase);
        console.log("Derived Private Key:", privateKey);
    } catch (error) {
        console.error("Error:", error.message);
    }
})();
