const ethers = require("ethers");

const ABI = require("./build/BlockTimestamp.json");
const bytecode = require("./build/BlockTimestamp.bytecode.json")

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://bsc-testnet-dataseed.bnbchain.org");
    const wallet = new ethers.Wallet("", provider);

    const factory = new ethers.ContractFactory(ABI, bytecode.bytecode, wallet);
    const owner = await factory.deploy();

    const contractDeploy = await owner.waitForDeployment();
    console.log(`deployed contract address : ${await contractDeploy.getAddress()}`); 
}


deploy();
