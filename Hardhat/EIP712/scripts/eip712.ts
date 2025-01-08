import { ethers } from "hardhat";

async function main() {
    try {
       const Verifier = await ethers.getContractFactory("EIP712Verifier");
       const verifier = await Verifier.deploy();
       await verifier.waitForDeployment();
       console.log(`contract address : ${await verifier.getAddress()}`); 
    } catch (error) {
        console.log(error);
    }
}

main();
