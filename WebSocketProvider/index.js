const { ethers } = require("ethers");

const provider = new ethers.WebSocketProvider(
  "wss://bsc.publicnode.com"
);

console.log("Connecting...");

provider.on("block", (blockNumber) => {
  console.log("📦 New Block:", blockNumber);
});
