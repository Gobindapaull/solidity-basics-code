const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com", 137);

async function getFees() {
    const feeData = await provider.getFeeData();
    console.log(feeData.maxPriorityFeePerGas); // 27373103576n

    const maxPriorityFeePerGasDouble = feeData.maxPriorityFeePerGas * 2n;
    console.log(maxPriorityFeePerGasDouble / 1000000000n); // 54n

    const maxFeePerGasDouble = feeData.maxFeePerGas * 2n;
    console.log(maxFeePerGasDouble / 1000000000n); // 54n
}

getFees();


// "ethers": "^6.15.0"
