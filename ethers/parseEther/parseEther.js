const ethers = require("ethers");


async function main() {
    const wei = ethers.parseEther("1");
    console.log(`Wei : ${wei} | type of wei : ${typeof wei}`);
    // Wei : 1000000000000000000 | type of wei : bigint

    const amount = 2000000n;
    const doubled = amount * 2n;
    console.log(`Doubled amount : ${doubled} | type of doubled : ${typeof doubled}`);
    // Doubled amount : 4000000 | type of doubled : bigint
}

main();
