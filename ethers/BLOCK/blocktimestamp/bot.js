const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");

provider.on("block", async (e) => {
    console.log(`New Block: ${e}`);

    const block = await provider.getBlock(e);
    console.log(`Timestamp: ${new Date(block.timestamp * 1000).toLocaleString()}`);
    console.log(`-----------------------------------------------------------------------------------------------------------------------`)
})
