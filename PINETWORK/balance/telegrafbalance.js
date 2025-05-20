const { Telegraf } = require('telegraf');
const bip39 = require('bip39');
const ed25519 = require('ed25519-hd-key');
const stellar = require('stellar-sdk');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

async function getPiWalletAddressFromSeed(mnemonic) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('❌ Invalid mnemonic phrase. Please try again.');
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const derivationPath = "m/44'/314159'/0'";
  const { key } = ed25519.derivePath(derivationPath, seed.toString('hex'));
  const keypair = stellar.Keypair.fromRawEd25519Seed(key);

  return {
    publicKey: keypair.publicKey(),
    secretKey: keypair.secret()
  };
}

bot.start((ctx) => {
  ctx.reply('👋 Welcome! Send me your 24-word Pi mnemonic phrase, and I will derive your wallet address and show the balance.');
});

bot.on('text', async (ctx) => {
  const mnemonic = ctx.message.text.trim();

  try {
    const { publicKey, secretKey } = await getPiWalletAddressFromSeed(mnemonic);

    const apiUrl = `https://api.mainnet.minepi.com/accounts/${publicKey}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    const nativeBalanceObj = data.balances.find(b => b.asset_type === 'native');
    const balance = nativeBalanceObj ? nativeBalanceObj.balance : '0';

    ctx.reply(`🚀 *Public Key (Pi Wallet Address)*: \`${publicKey}\`
🔑 *Secret Key*: \`${secretKey}\`
💰 *Pi Balance*: ${balance} Pi`, {
      parse_mode: 'Markdown'
    });
  } catch (err) {
    ctx.reply(`❌ Error: ${err.response?.data?.message || err.message}`);
  }
});

bot.launch();
console.log('🤖 Telegram bot is running...');
