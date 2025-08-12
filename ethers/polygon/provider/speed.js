const { ethers } = require("ethers");

function blockNumber() {
    const provider = new ethers.JsonRpcProvider("https://1rpc.io/matic");
    provider.on("block", (e) => {
        console.log(e);
    })
}

const blockNumberArrow = () => {
    const provider = new ethers.JsonRpcProvider("https://1rpc.io/matic");
    provider.on("block", (e) => {
        console.log(e);
    })
}


console.time("blockNumber");
blockNumber();
console.timeEnd("blockNumber");

console.time("blockNumberArrow");
blockNumberArrow();
console.timeEnd("blockNumberArrow");

// blockNumber: 0.29ms
// blockNumberArrow: 0.033ms
