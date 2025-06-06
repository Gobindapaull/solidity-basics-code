const { ethers } = require("ethers");
const fs = require("fs");

const WALLET_COUNT = 1000;

// Generate amounts array
function generateAmounts(count, value = "1000000") {
    return Array.from({ length: count }, () => value);
}

const amounts = generateAmounts(WALLET_COUNT);
fs.writeFileSync("amounts.json", JSON.stringify(amounts, null, 2));
console.log(`✅ Saved ${amounts.length} amounts to amounts.json`);
