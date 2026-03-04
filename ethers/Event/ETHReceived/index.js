const { ethers } = require("ethers");

// ⚡ Must use WebSocket for live events
const provider = new ethers.WebSocketProvider("wss://eth.llamarpc.com");

const CONTRACT_ADDRESS = "0x388C818CA8B9251b393131C08a736A67ccB19297";

const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ["event ETHReceived(uint256 amount)"],
    provider
);

contract.on("ETHReceived", (amount) => {
    console.log("🔥 Contract received ETH!");
    console.log("Amount:", ethers.formatEther(amount), "ETH");
});
