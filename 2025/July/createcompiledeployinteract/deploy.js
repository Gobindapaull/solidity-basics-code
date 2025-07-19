const ethers = require("ethers");
require("dotenv").config();

const ABI = require("./build/EventLogger.json");
const bytecode = require("./build/EventLogger.bytecode.json");

async function deploy() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const factory = new ethers.ContractFactory(ABI, bytecode.bytecode, wallet);
    const contract = await (await factory.deploy()).waitForDeployment();

    console.log(`Deployed contract address: ${await contract.getAddress()}`);

}

deploy();
