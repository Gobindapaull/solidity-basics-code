const ethers = require("ethers");

const ABI = require("./build/Owner.json");
const bytecode = require("./build/Owner.bytecode.json")

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/bsc_testnet_chapel");
    const wallet = new ethers.Wallet("", provider);

    const factory = new ethers.ContractFactory(ABI, bytecode.bytecode, wallet);
    const owner = await factory.deploy();

     const contractDeploy = await owner.waitForDeployment();
    console.log(`deployed contract address : ${await contractDeploy.getAddress()}`); 

    const ownerAddress = await contractDeploy.owner();
    console.log(`Initial Owner address : ${ownerAddress}`);

    const newOwner = await contractDeploy.changeOwner("0x7f5f2cF1aec83bF0c74DF566a41aa7ed65EA84Ea");
    await newOwner.wait();
    const newOwnerAddresss = await contractDeploy.owner();
    console.log(`new owner addressss : ${newOwnerAddresss}`);
}


deploy();
