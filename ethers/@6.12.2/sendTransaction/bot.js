const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia");

const wallet = new ethers.Wallet("", provider);
console.log(wallet.address);

// provider.on("block", async (e) => {
//     console.log(e);
// })

// Convert user-provided strings in ether to wei
const eth = ethers.parseEther("2.393");
console.log(eth); // 2393000000000000000n

// Convert user-provided strings in gwei to wei
const feePerGas = ethers.parseUnits("11", "gwei");
console.log(feePerGas);

// Convert a value in wei to a string in ether
const ethString = ethers.formatEther(123456789);
console.log(ethString); // 0.000000000123456789 ETH

const bot = async () => {
    // current block number
   const block = await provider.getBlockNumber();
   console.log(`Block: ${block}`);
   console.log(`Type Of block : ${typeof block}`); // number

   // wallet eth balance
   const balance = await provider.getBalance(wallet.address);
   console.log(`typeof Balance WEI : ${typeof balance}`); // bigint
   console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
   console.log(`typeof Balance ETH : ${typeof ethers.formatEther(balance)}`); // string

   // nonce 
   const nonce = await provider.getTransactionCount(wallet.address);
   console.log(`Nonce : ${nonce}`);

   // sending a transaction
   const tx = await wallet.sendTransaction({
    to: ethers.Wallet.createRandom(),
    value: ethers.parseEther("0.000001"),
    gasPrice: ethers.parseUnits("299", "gwei")
   });

   const receipt = await tx.wait();
   console.log(`Transaction sent !`)
   console.log(`Transaction hash : ${receipt.hash}`);
}

bot();


// Block: 6967077
// Type Of block : number
// typeof Balance WEI : bigint
// Balance: 0.039820896022683 ETH
// typeof Balance ETH : string
// Nonce : 1
// Transaction sent !
// Transaction hash : 0x87b0500254a0f8a084f5518fd1c52624c6cc6fbdd68998e446a015cec1ccd77c


// https://sepolia.etherscan.io/tx/0x87b0500254a0f8a084f5518fd1c52624c6cc6fbdd68998e446a015cec1ccd77c
