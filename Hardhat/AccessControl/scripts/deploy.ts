import { ethers } from "hardhat";

async function main() {
    try {
        const AccessControlContract = await ethers.getContractFactory("AccessControlContract");
        const accessControlContract = await AccessControlContract.deploy();
        await accessControlContract.waitForDeployment();
        console.log(`contract address : ${await accessControlContract.getAddress()}`);
    } catch (error) {
        console.log(error);
    }
}

main();


// npx hardhat init .
// npx hardhat run scripts/deploy.ts --network sepolia
// npx hardhat verify --network sepolia 0xAd364fbc5E2771a5Dc931F33727902edf027bb77
// https://sepolia.etherscan.io/address/0xAd364fbc5E2771a5Dc931F33727902edf027bb77#code
