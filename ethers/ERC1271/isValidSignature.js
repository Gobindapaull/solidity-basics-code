const ethers = require("ethers");
const fs = require("fs");

const artifact = JSON.parse(fs.readFileSync("./build/ContractWallet.json", "utf8"));
const ABI = artifact.abi;

const tokenAddress = "0x1eb417D03e1B985151580a5719bF3fD5356a62aD";

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com");
    const wallet = new ethers.Wallet("", provider);

    const tokenContract = new ethers.Contract(tokenAddress, ABI, wallet);

    // Prepare message
    const message = "hello ERC1271";
    const signature = await wallet.signMessage(message);

    // Hash must match Solidity's `hash.recover(signature)`
    const hash = ethers.hashMessage(message);

    console.log("Message:", message);
    console.log("Hash:", hash);
    console.log("Signature:", signature);

    // Call ERC1271 check
    const result = await tokenContract.isValidSignature(hash, signature);
    console.log("ERC1271 result:", result);
}


deploy();
