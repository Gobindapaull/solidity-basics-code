const axios = require("axios");
const StellarSdk = require("stellar-sdk");
require("dotenv").config();

async function decode() {
    const url = `https://api.mainnet.minepi.com/accounts/${process.env.ACCOUNT}/operations?order=desc&limit=1`;

    try {
        const res = await axios.get(url);
        const operation = res.data._embedded.records[0];
        // Latest Operation
        console.log(`🧾 Type: `, operation.type);
        console.log(`🔑 From: `, operation.from);
        console.log(`📥 To: `, operation.to);
        console.log(`💰 Amount: `, operation.amount);
    } catch (error) {
        console.log(`Error decoding operation:`, error.message);
    }
}
decode()
