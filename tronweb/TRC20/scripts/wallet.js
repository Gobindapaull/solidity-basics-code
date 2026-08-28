const { TronWeb } = require("tronweb");

async function generateWallet() {
    const account = await TronWeb.createAccount();

    console.log("================================");
    console.log("       TRON WALLET");
    console.log("================================");

    console.log("Address:");
    console.log(account.address.base58);

    console.log("\nPrivate Key:");
    console.log(account.privateKey);

    console.log("\nHex Address:");
    console.log(account.address.hex);

    console.log("================================");
}

generateWallet().catch(console.error);
