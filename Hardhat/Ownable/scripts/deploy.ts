// npx hardhat init .
// npm install
// npx hardhat run scripts/deploy.ts --network sepolia
// npx hardhat verify --network sepolia 0xBaC3F5790381C41D229bd1914D3f44F2C1d51C32
// https://sepolia.etherscan.io/address/0xBaC3F5790381C41D229bd1914D3f44F2C1d51C32#code

import { ethers } from "hardhat";

async function main() {
    try {
        const MyContract = await ethers.getContractFactory("MyContract");
        const myContract = await MyContract.deploy();
        await myContract.waitForDeployment();
        console.log(`contract address : ${await myContract.getAddress()}`);
    } catch (error) {
        console.log(error);
    }
}

main();
