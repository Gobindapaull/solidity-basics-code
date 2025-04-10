const axios = require('axios');

const walletAddress = "GCHWFW642HI2XBD4UWMFEMGOH2AX4OWT3F6S5KRM2TWI5SL244CPZQ34";
const apiUrl = `https://api.mainnet.minepi.com/accounts/${walletAddress}`;
// 

async function getPiBalance() {
  try {
    const res = await axios.get(apiUrl);
    console.log(`Pi Balance : ${res.data.balances[0].balance}`); // Inspect this for balance, etc.
  } catch (err) {
    console.error("Could not fetch balance:", err.message);
  }
}

getPiBalance();
