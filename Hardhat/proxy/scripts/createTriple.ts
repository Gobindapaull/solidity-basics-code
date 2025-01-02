import { ethers, upgrades } from "hardhat";
import { ContractFactory } from "ethers";

async function main() {
    const Triple = await ethers.getContractFactory("Triple");
    const triple = await upgrades.deployProxy(Triple, {
        kind: "transparent"
    });
    await triple.waitForDeployment();
    console.log(`proxy address : ${await triple.getAddress()}`);
}

main();
