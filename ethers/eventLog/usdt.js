require("dotenv").config();
const ethers = require("ethers");

const provider = new ethers.WebSocketProvider(process.env.WS);
const usdt = process.env.CONTRACT_ADDRESS;


const filter = {
    address: usdt,
    topics: [ethers.id("Transfer(address,address,uint256)")]
}

const listen = async () => {
    provider.on(filter, (log) => {
        const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
            ["uint256"],
            log.data
        )[0];

        console.log("USDT Transfer detected:");
        console.log(`From: 0x${log.topics[1].slice(26)}`);
        console.log(`To: 0x${log.topics[2].slice(26)}`);
        console.log(`Amount: ${ethers.formatUnits(decoded, 6)}`);
        console.log("----------------------------");
    })
}

listen();

