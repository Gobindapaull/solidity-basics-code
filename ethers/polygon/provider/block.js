const { ethers } = require("ethers");

async function getBlockNumber() {
    const provider = new ethers.JsonRpcProvider("https://1rpc.io/matic");
    provider.on("block", (e) => {
        console.log(e);
    })
}

getBlockNumber();
