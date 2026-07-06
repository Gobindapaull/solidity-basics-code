const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider("https://eth.blockrazor.xyz");

    try {
        const currentBlockNumber = await provider.getBlockNumber();
        console.log(`Current Block Number: ${currentBlockNumber}\n`);

        const block = await provider.getBlock("latest");
        console.log("--- Latest Block Details ---");
        console.log(`Hash:       ${block.hash}`);
        console.log(`Timestamp:  ${new Date(block.timestamp * 1000).toLocaleString()}`);
        console.log(`Total Txs:  ${block.transactions.length}`);
    } catch (error) {
        console.log(error);
    }
}

main();
