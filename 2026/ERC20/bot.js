require("dotenv").config();
const { Telegraf } = require("telegraf");
const { ethers } = require("ethers");

const abi = require("./abi/tokenABI.json");
const bot = new Telegraf(process.env.BOT_TOKEN);
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const token = new ethers.Contract(contractAddress, abi, wallet);


bot.start((ctx) => {
    ctx.reply(`
ERC20 token bot

Commands:

/info
/balance
/transfer 
/burn
`)
});

bot.command("info", async (ctx) => {
    try {
        const name = await token.name();
        const symbol = await token.symbol();
        const supply = await token.totalSupply();

        ctx.reply(`
Token Info
        
Name: ${name}

Symbol: ${symbol}

supply: ${ethers.formatEther(supply).replace(".0", "")}
        `)
    } catch (error) {
        console.log(error);
        ctx.reply(`Failed to fetch token info`);
    }
})

bot.command("balance", async (ctx) => {
    try {
        const parts = ctx.message.text.split(" ");
        const address = parts[1];
        const balance = await token.balanceOf(address);

        ctx.reply(`
Wallet balance

Address: ${address}

Balance: ${ethers.formatEther(balance).replace(".0", "")}
`)
    } catch (error) {
        console.log(error);
        ctx.reply(`Failed to get balance`);
    }
})

bot.command("transfer", async (ctx) => {
    try {
        const parts = ctx.message.text.split(" ");
        const to = parts[1];
        const amount = parts[2];
        ctx.reply(`Sending ${amount} tokens ...`);
        const tx = await token.transfer(to, ethers.parseEther(amount));
        await tx.wait();
        ctx.reply(`
Transfer success

Hash: ${tx.hash}
`)
    } catch (error) {
        console.log(error);
        ctx.reply(`Failed to transfer token`);
    }
})

bot.command("burn", async (ctx) => {
    try {
        const parts = ctx.message.text.split(" ");
        const amount = parts[1];
        ctx.reply(`Burning ${amount} tokens ...`);

        const tx = await token.burn(amount);
        await tx.wait();

        ctx.reply(`
Burn success

Hash: ${tx.hash}
`)
    } catch (error) {
        console.log(error);
        ctx.reply(`Failed to burn tokens`);
    }
})
bot.launch();
console.log(`Telegram bot running`);
