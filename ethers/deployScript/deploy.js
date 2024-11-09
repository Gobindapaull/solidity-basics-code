const ethers = require("ethers");

const Counter = require("./Counter.json");

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/bsc_testnet_chapel");
    const wallet = new ethers.Wallet("", provider);

    const factory = new ethers.ContractFactory(Counter.abi, Counter.data.bytecode, wallet);
    const counter = await factory.deploy(123);

    const contractDeploy = await counter.waitForDeployment();
    console.log(await contractDeploy.getAddress()); // 0x3790D741B0b61ca46066015434587d0177427d71
}

deploy();
