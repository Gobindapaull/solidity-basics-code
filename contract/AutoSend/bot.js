require("dotenv").config();

const { Telegraf } = require("telegraf");
const { ethers } = require("ethers");

const ABI = require("./abi.json");

const bot = new Telegraf(process.env.BOT_TOKEN);

const provider = new ethers.JsonRpcProvider(
    process.env.RPC_URL
);

const contractAddress =
    process.env.CONTRACT_ADDRESS.toLowerCase();

const contract = new ethers.Contract(
    contractAddress,
    ABI,
    provider
);

// START COMMAND
bot.start(async (ctx) => {

    const receiver = await contract.receiver();

    ctx.reply(`
╔════════════════════╗
      AUTO SEND BOT
╚════════════════════╝

📥 Send ETH To Contract:

${contractAddress}

⚡ ETH Auto Forward:
${receiver}

✅ Monitoring Started
`);

    // WATCH BLOCKS
    provider.on("block", async (blockNumber) => {

        console.log("New Block:", blockNumber);

        const block = await provider.getBlock(blockNumber);

        if (!block || !block.transactions) return;

        // LOOP TX HASHES
        for (const txHash of block.transactions) {

            try {

                const tx = await provider.getTransaction(txHash);

                if (!tx || !tx.to) continue;

                // CHECK CONTRACT ADDRESS
                if (
                    tx.to.toLowerCase() === contractAddress
                ) {

                    const amount = ethers.formatEther(
                        tx.value
                    );

                    console.log(`
Incoming ETH:
${amount}

From:
${tx.from}
`);

                    await ctx.reply(`
💰 New ETH Received

📥 Amount:
${amount} ETH

👤 From:
${tx.from}

📄 Hash:
${tx.hash}

🔗 Explorer:
https://testnet.bscscan.com/tx/${tx.hash}
`);
                }

            } catch (err) {

                console.log(err);

            }
        }
    });
});

bot.launch();

console.log("Bot running...");

// Auto send ETH telegram bot
