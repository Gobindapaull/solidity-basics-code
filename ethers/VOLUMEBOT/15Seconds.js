require("dotenv").config();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const minTime = parseInt(process.env.MIN_DELAY);
const maxTime = parseInt(process.env.MAX_DELAY);
var delaySeconds = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
console.log(`⏳ Sleeping for ${delaySeconds} seconds ...`);

const test = async () => {
    await sleep(delaySeconds * 1000);
}

test();
