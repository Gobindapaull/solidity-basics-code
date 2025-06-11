require("dotenv").config();
const { ethers } = require("ethers");
const axios = require('axios');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const erc20ABI = require("./ERC20ABI.json");

async function checkToken() {
    const token = new ethers.Contract(process.env.TOKEN_ADDRESS, erc20ABI, provider);

    try {
        console.log("🔍 Token Security Checking...");
        const [name, owner] = await Promise.all([
            token.name(),
            token.owner()
        ]);
        console.log(`🪙  Name: ${name}`);
        console.log(`👨‍ Owner: ${owner}`);

        const res = await axios.get(`https://api.gopluslabs.io/api/v1/token_security/56?contract_addresses=${process.env.TOKEN_ADDRESS}`);
        const data = res.data.result[process.env.TOKEN_ADDRESS.toLocaleLowerCase()];

        if (data) {
            console.log(`🚫 Is honeypot: ${data.is_honeypot}`);
            console.log(`💸 Buy tax: ${data.buy_tax}%`);
            console.log(`💸 Sell tax: ${data.sell_tax}%`);
            console.log(`🚨 Owner change possible: ${data.can_take_back_ownership}`);
            console.log(`🛡️  Blacklist enabled: ${data.is_blacklisted}`);
            console.log(`🌀 Mintable: ${data.is_mintable}`);
        } else {
            console.log("❌ Token data not found.");
        }
    } catch (error) {
        console.log("Error : ", error);
    }
}

checkToken();
