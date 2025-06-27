const { Telegraf, session } = require('telegraf');
const StellarSdk = require('stellar-sdk');
const ed25519 = require('ed25519-hd-key');
const bip39 = require('bip39');
const axios = require('axios');
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

bot.start((ctx) => {
    ctx.session = {};
    ctx.reply('👋 Welcome to the Pi Auto Withdraw Bot!\n\nPlease enter your 12/24-word mnemonic phrase:');
});

bot.on('text', async (ctx) => {
    const input = ctx.message.text;

    if (!ctx.session.phrase) {
        ctx.session.phrase = input.trim();
        ctx.reply('✅ Got it!\nNow, please enter the Pi token receiver address:');
    } else if (!ctx.session.receiver) {
        ctx.session.receiver = input.trim();
        ctx.reply('✅ Receiver address received!\n\n🚀 Starting the bot now...');
        startLoopingBot(ctx.session.phrase, ctx.session.receiver, ctx);
    } else {
        ctx.reply('⚠️ Already received inputs. Type /start to reset.');
    }
});

async function getPiWalletAddressFromSeed(mnemonic) {
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error("Invalid mnemonic phrase.");
    }

    const seed = await bip39.mnemonicToSeed(mnemonic);
    const derivationPath = "m/44'/314159'/0'";
    const { key } = ed25519.derivePath(derivationPath, seed.toString('hex'));
    const keypair = StellarSdk.Keypair.fromRawEd25519Seed(key);

    return {
        publicKey: keypair.publicKey(),
        secretKey: keypair.secret()
    };
}

async function runPiBot(mnemonic, recipient, ctx) {
    const server = new StellarSdk.Server('https://api.mainnet.minepi.com');
    
    try {
        const wallet = await getPiWalletAddressFromSeed(mnemonic);
        const senderSecret = wallet.secretKey;
        const senderPublic = wallet.publicKey;
        const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecret);

        const account = await server.loadAccount(senderPublic);
        const baseFee = await server.fetchBaseFee();
        const fee = (baseFee * 2).toString();
        const res = await axios.get(`https://api.mainnet.minepi.com/accounts/${senderPublic}`);
        const balance = res.data.balances[0].balance;
        const withdrawAmount = Number(balance) - 2;

        if (withdrawAmount <= 0) {
            ctx.reply("⚠️ Not enough Pi to withdraw.");
            return;
        }

        const formattedAmount = withdrawAmount.toFixed(7).toString();

        const tx = new StellarSdk.TransactionBuilder(account, {
            fee,
            networkPassphrase: 'Pi Network',
        })
        .addOperation(StellarSdk.Operation.payment({
            destination: recipient,
            asset: StellarSdk.Asset.native(),
            amount: formattedAmount,
        }))
        .setTimeout(30)
        .build();

        tx.sign(senderKeypair);

        const result = await server.submitTransaction(tx);

        if (result?.hash) {
            ctx.reply(`✅ Withdrawal Success!\n\n🔗 Tx Hash: ${result.hash}\nView: https://api.mainnet.minepi.com/transactions/${result.hash}`);
        } else {
            ctx.reply("⚠️ Transaction was submitted but not confirmed.");
        }

    } catch (e) {
        const error = e.response?.data?.extras?.result_codes || e.message || e;
        ctx.reply(`❌ Error: ${error}`);
    }
}

async function startLoopingBot(mnemonic, recipient, ctx) {
    while (true) {
        await runPiBot(mnemonic, recipient, ctx);
        await new Promise(resolve => setTimeout(resolve, 499)); // ⏱️ wait 60 seconds before next check
    }
}

bot.launch();
console.log('🚀 Pi Bot running...');
