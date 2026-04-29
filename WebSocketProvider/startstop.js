const { ethers } = require("ethers");

let provider;

async function start() {
    provider = new ethers.WebSocketProvider(
        "wss://bsc.publicnode.com"
    );

    console.log("🟢 Connected");

    provider.on("block", (block) => {
        console.log("📦 Block:", block);
    });
}

function stop() {
    if (!provider) return;

    console.log("🔴 Stopping...");

    provider.removeAllListeners();

    if (provider.websocket) {
        provider.websocket.close();
    }

    provider = null;

    console.log("✅ Stopped cleanly");
}

// ▶️ START FIRST
start();

// ⛔ STOP after 3 seconds (test only)
setTimeout(() => {
    stop();
}, 5000);
