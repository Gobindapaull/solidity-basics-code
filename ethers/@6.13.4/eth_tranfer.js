const ethers = require("ethers")

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth")

const main = async () => {
    const privateKey = new ethers.Wallet("")
    console.log(privateKey.address)

    const balance = await provider.getBalance(privateKey.address);
    const balance_eth = ethers.formatEther(balance);
    console.log(`${balance_eth} ETH`);
}

main();

// "ethers": "^6.13.5"
