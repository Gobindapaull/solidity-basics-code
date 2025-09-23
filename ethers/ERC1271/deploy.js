const ethers = require("ethers");
const fs = require("fs");

const artifact = JSON.parse(fs.readFileSync("./build/ContractWallet.json", "utf8"));
const ABI = artifact.abi;
const bytecode = artifact.bytecode;

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com");
    const wallet = new ethers.Wallet("", provider);
    const factory = new ethers.ContractFactory(ABI, bytecode, wallet);
    const contract = await factory.deploy(wallet.address);
    const contractDeploy = await contract.waitForDeployment();
    console.log(`deployed contract address: ${await contractDeploy.getAddress()}`);
}

deploy();

// https://testnet.bscscan.com/address/0x1eb417D03e1B985151580a5719bF3fD5356a62aD
