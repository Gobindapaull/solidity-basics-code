const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia");

const wallet = new ethers.Wallet("", provider);
console.log(wallet.address);

const WETH = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
const ABI = require("./ABI.json");

const contract = new ethers.Contract(WETH, ABI, wallet);



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

   const decimals = await contract.decimals();
   const name = await contract.name()

   const tokenBalance = await contract.balanceOf(wallet.address);
   console.log(`Token balance: ${ethers.formatUnits(tokenBalance, decimals)} ${name}`);
}

bot();



// 0x57e1261E0AcA83Ea0297e322A43763f9dBd7dbBE
// 2393000000000000000n
// 11000000000n
// 0.000000000123456789
// Block: 6967175
// Type Of block : number
// typeof Balance WEI : bigint
// Balance: 0.027260896022683 ETH
// typeof Balance ETH : string
// Nonce : 3
// Transaction sent !
// Transaction hash : 0xc25a3f53c04eeaaaa02286885c7866a585fe8ded99bd7c91337e293346285a3f
// Token balance: 0.0 Wrapped Ether


// https://sepolia.etherscan.io/tx/0x87b0500254a0f8a084f5518fd1c52624c6cc6fbdd68998e446a015cec1ccd77c
