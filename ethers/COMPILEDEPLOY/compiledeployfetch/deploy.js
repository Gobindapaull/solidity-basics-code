const ethers = require("ethers");
const ABI = require("./build/UserNotes.json");
const bytecode = require("./build/UserNotes.bytecode.json");

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com");
    const wallet = new ethers.Wallet("", provider);
    const factory = new ethers.ContractFactory(ABI, bytecode.bytecode, wallet);
    const owner = await factory.deploy();
    const contractDeploy = await owner.waitForDeployment();
    console.log(`deployed contract address: ${await contractDeploy.getAddress()}`);
}

deploy();
