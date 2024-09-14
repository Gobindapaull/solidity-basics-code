const ethers = require("ethers");
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");

const wallet = new ethers.Wallet("0x76cd92c194cef2610c734221d44237d571616547de12d80c4c7561d410b37239");
console.log(`wallet address: ${wallet.address}`);

const estimateGas = async () => {
    const estimateGas = await provider.estimateGas(wallet);
    console.log(estimateGas);
    console.log(estimateGas.toLocaleString());
    console.log(estimateGas.toString());
    console.log(estimateGas.valueOf());
    console.log("=========================");
}

const getFeeData = async () => {
    const getFeeData = await provider.getFeeData();
    console.log(getFeeData);
    console.log(`${ethers.formatUnits(getFeeData.gasPrice, 9)} GWEI`);
    console.log(`${ethers.formatUnits(getFeeData.maxFeePerGas, 9)} GWEI`);
    console.log(getFeeData.maxPriorityFeePerGas);
    console.log("=========================");
}

const getBalance = async () => {
    const getBalance = await provider.getBalance("0x2bf916f8169Ed2a77324d3E168284FC252aE4087");
    console.log(`wallet balance: ${ethers.formatEther(getBalance)} ETH`);
    console.log("=========================");
}


const main = async () => {
    getBalance();

    getFeeData();

    estimateGas();
}

main();
