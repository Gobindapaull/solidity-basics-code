const ethers = require("ethers");

const ABI = require("./build/AutoETH.json");
const bytecode = require("./build/AutoETH.bytecode.json")

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://polygon-pokt.nodies.app");
    const wallet = new ethers.Wallet("", provider);

    const factory = new ethers.ContractFactory(ABI, bytecode.bytecode, wallet);
    const owner = await factory.deploy();

    const contractDeploy = await owner.waitForDeployment();
    console.log(`deployed contract address : ${await contractDeploy.getAddress()}`); 

}


deploy();
