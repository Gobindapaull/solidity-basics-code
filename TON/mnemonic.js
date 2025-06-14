import { mnemonicNew } from '@ton/crypto';

const Mnemonic = async () => {
    const mnemonic = await mnemonicNew(24);
    console.log('Generated mnemonic (24 words):', mnemonic);
};

Mnemonic();
