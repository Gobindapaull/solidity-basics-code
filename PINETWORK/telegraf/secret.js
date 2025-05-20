const { Telegraf } = require('telegraf');
const bip39 = require('bip39');
const ed25519 = require('ed25519-hd-key');
const stellar = require('stellar-sdk');
require("dotenv").config();

// Replace with your actual Telegram Bot Token
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

// Command handler for /start
bot.start((ctx) => {
  ctx.reply('👋 Welcome! Send me your 24-word Pi mnemonic phrase, and I will derive your wallet address.');
});

// Handle text messages (assumed to be mnemonic input)
bot.on('text', async (ctx) => {
  const mnemonic = ctx.message.text.trim();

  try {
    const { publicKey, secretKey } = await getPiWalletAddressFromSeed(mnemonic);

    ctx.reply(`🚀 *Public Key (Pi Wallet Address)*: \`${publicKey}\`\n🔑 *Secret Key*: \`${secretKey}\``, {
      parse_mode: 'Markdown'
    });
  } catch (err) {
    ctx.reply(`❌ Error: ${err.message}`);
  }
});

// Start the bot
bot.launch();
console.log('🤖 Telegram bot is running...');
