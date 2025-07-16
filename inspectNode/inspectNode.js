const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("http://ip_address:8545");

async function inspectNode() {
  try {
    // 1. Get chain ID
    const network = await provider.getNetwork();
    console.log("Chain ID:", Number(network.chainId));

    // 2. Get latest block number
    const block = await provider.getBlockNumber();
    console.log("Latest Block Number:", block);

    // 3. Check if node is syncing
    const syncing = await provider.send("eth_syncing", []);
    if (syncing === false) {
      console.log("Node is fully synced.");
    } else {
      console.log("Node is syncing:", syncing);
    }

    // 4. Get client version (Nethermind, Geth, etc.)
    const clientVersion = await provider.send("web3_clientVersion", []);
    console.log("Client Version:", clientVersion);

    // 5. (Optional) Get peer count
    const peerCountHex = await provider.send("net_peerCount", []);
    const peerCount = parseInt(peerCountHex, 16);
    console.log("Connected Peers:", peerCount);

  } catch (err) {
    console.error("Error:", err.message || err);
  }
}

inspectNode();
