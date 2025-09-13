
const ethers = require("ethers");
const fs = require("fs").promises;

const sleep = ms => new Promise(res => setTimeout(res, ms));

async function generateWallets() {
  try {

    for (let i = 0; i < 1000; i++) {
      const walletRandom = ethers.Wallet.createRandom();
      const address = walletRandom.address;
      console.log(`${i + 1}: ${address}`);

      // wait 1.5 seconds (1500 ms) before next wallet
      await sleep(1500);
    }

  } catch (err) {
    console.error("Error:", err);
  }
}

generateWallets();
