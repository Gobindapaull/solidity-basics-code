const WebSocket = require("ws");

const WS_URL = "wss://ethereum-rpc.publicnode.com";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const TRANSFER_TOPIC =
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

const ws = new WebSocket(WS_URL);

ws.on("open", () => {
    console.log("Connected");

    ws.send(JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_subscribe",
        params: [
            "logs",
            {
                address: USDT,
                topics: [TRANSFER_TOPIC]
            }
        ]
    }));
});

ws.on("message", (data) => {
    const message = JSON.parse(data.toString());

    if (message.result) {
        console.log("Subscription ID:", message.result);
    }

    if (message.method === "eth_subscription") {
        const log = message.params.result;

        const rawAmount = BigInt(log.data);
        const whole = rawAmount / 1000000n;
        const decimal = rawAmount % 1000000n;

        console.log("\n" + "=".repeat(60));
        console.log("🚨 USDT TRANSFER");
        console.log("=".repeat(60));
        console.log("Block:", parseInt(log.blockNumber, 16));
        console.log("Transaction:", log.transactionHash);
        console.log("From:", "0x" + log.topics[1].slice(-40));
        console.log("To:", "0x" + log.topics[2].slice(-40));
        console.log(
            "Amount:",
            `${whole}.${decimal.toString().padStart(6, "0")} USDT`
        );
    }
});

ws.on("error", console.error);

ws.on("close", () => {
    console.log("WebSocket disconnected");
});
