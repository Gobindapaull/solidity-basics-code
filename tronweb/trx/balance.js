require("dotenv").config();

const { TronWeb } = require("tronweb");
const chalk = require("chalk").default;

const privateKey = process.env.PRIVATE_KEY;
const userWallet = process.env.USER_WALLET;

const tronweb = new TronWeb({
    fullHost: process.env.FULL_HOST,
    privateKey
});

function timestamp() {
    return new Date().toLocaleString();
}

async function main() {

    console.log(
        chalk.cyan(
            `\n[${timestamp()}] Connecting to TRON...\n`
        )
    );

    // ======================
    // Latest Block
    // ======================

    const block = await tronweb.trx.getCurrentBlock();

    console.log(
        chalk.yellow(
            `[${timestamp()}] Current Block: `
        ) +
        chalk.green(
            block.block_header.raw_data.number
        )
    );

    // ======================
    // Wallet Address
    // ======================

    const wallet = tronweb.address.fromPrivateKey(
        privateKey
    );

    console.log(
        chalk.yellow(
            `[${timestamp()}] Wallet Address: `
        ) +
        chalk.magenta(wallet)
    );

    // ======================
    // TRX Balance
    // ======================

    const trxBalance = await tronweb.trx.getBalance(
        userWallet
    );

    console.log(
        chalk.yellow(
            `[${timestamp()}] TRX Balance: `
        ) +
        chalk.green(
            tronweb.fromSun(trxBalance)
        )
    );

    console.log(
        chalk.cyan(
            `\n[${timestamp()}] Finished.\n`
        )
    );
}

main();

// TRX BALANCE CHECKER BOT
