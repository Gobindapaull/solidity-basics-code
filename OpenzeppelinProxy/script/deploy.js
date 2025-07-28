const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("FivePointOneRatio");
    const proxy = await upgrades.deployProxy(Token, [
        "0x1000000000000000000000000000000000000001", // Treasury
        "0x1000000000000000000000000000000000000002", // Liquidity
        "0x1000000000000000000000000000000000000003", // Dev Wallet
        "0x1000000000000000000000000000000000000004", // Founder
        "0x1000000000000000000000000000000000000005"  // Initial Owner
    ], {
        initializer: "initialize",
        kind: "transparent",
    });

    await proxy.waitForDeployment();
    console.log("5Point1Ratio Proxy deployed to:", await proxy.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
