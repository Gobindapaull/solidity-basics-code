const stellar = require("@stellar/stellar-sdk");
const server = new stellar.Horizon.Server("https://api.mainnet.minepi.com");
const publicKey = "GD5HGPHVL73EBDUD2Z4K2VDRLUBC4FFN7GOBLKPK6OPPXH6TED4TRK73";

async function checkAccount() {
    try {
        const account = await server.loadAccount(publicKey);
        account.balances.forEach((balance) => {
            console.log(`Asset : ${balance.asset_type}, Balance : ${balance.balance}`);
        })
    } catch (error) {
        console.log(error);
    }
}

checkAccount();


