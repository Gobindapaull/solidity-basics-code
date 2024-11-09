const ethers = require("ethers");

const Counter = require("./Counter.json");

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/bsc_testnet_chapel");
    const wallet = new ethers.Wallet("", provider);

    const factory = new ethers.ContractFactory(Counter.abi, Counter.data.bytecode, wallet);
    const counter = await factory.deploy(123);

     const contractDeploy = await counter.waitForDeployment();
    console.log(`deployed contract address : ${await contractDeploy.getAddress()}`); // 0xbAa4c3b6eE46119B455cB2496e9cecdbF2D11E40

    const count = await contractDeploy.getCount();
    console.log(`Initial count : ${count}`);

    const increment = await contractDeploy.increment();
    await increment.wait();
    const incrementCount = await contractDeploy.getCount();
    console.log(`new count : ${incrementCount}`);
}

deploy();
