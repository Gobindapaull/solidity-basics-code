const ethers = require("ethers"); // "ethers": "^6.13.4"

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
const contractAddress = "0x44ff8620b8cA30902395A7bD3F2407e1A091BF73";
const slot = 2;

async function main() {
    try {
        const storageData = await provider.getStorage(contractAddress, slot);
        console.log(`Storage at slot ${slot} : ${storageData}`);
    } catch (error) {
        console.log(error);
    }
}

main();
