const ethers = require("ethers");
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth")

async function blockNumber() {

    const wallet =  ethers.Wallet.createRandom();
    console.log(`random wallet : ${wallet.address}`);

    const walletAddress = "0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552";

    // const mnemonic = "puppy arrange umbrella wedding mixture shield blanket tornado teach cherry kite vintage"
    // const w = ethers.Wallet.fromPhrase(mnemonic);
    // console.log(w.address);

    const balance = await provider.getBalance(walletAddress);
    console.log(ethers.formatEther(balance));

    AccountType(walletAddress)
}

async function AccountType(addr) {
    const type = await provider.getCode(addr);
    // console.log(type);

    if (type === "0x") {
        console.log("EOA address");
    } else {
        console.log("Contract address");
    }
}
blockNumber();
