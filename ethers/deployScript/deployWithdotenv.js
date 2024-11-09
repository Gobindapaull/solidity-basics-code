const ethers = require("ethers");
require("dotenv").config();

const Counter = require("./Counter.json");

const url = process.env.URL;
const privateKey = process.env.PRIVATE_KEY;

async function deploy() {
    const provider = new ethers.JsonRpcProvider(url);
    const wallet = new ethers.Wallet(privateKey, provider);

    const factory = new ethers.ContractFactory(Counter.abi, Counter.data.bytecode, wallet);
    const counter = await factory.deploy(123);

    const contractDeploy = await counter.waitForDeployment();
    console.log(`deployed contract address: ${await contractDeploy.getAddress()}`);

    const count = await contractDeploy.getCount();
    console.log(`Initial count : ${count}`);

    const increment = await contractDeploy.increment();
    await increment.wait();
    const newCount = await contractDeploy.getCount();
    console.log(`new count: ${newCount}`);
}

deploy();
