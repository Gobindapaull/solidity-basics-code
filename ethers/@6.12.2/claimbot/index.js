const ethers = require("ethers");

const privateKey = "";
const url = "https://rpc.ankr.com/polygon";

const tokenAddress = "0x0566C506477cD2d8dF4e0123512dBc344bD9D111"; // MLC
const presaleContractAddress = "0x7a5187f52Efb3bD769EA46Ae86bC343c1Dd9D85e"; // presale contract

const ABI = require("./ABI.json");
const presaleABI = require("./presaleABI.json");

const receiverWallet = "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD";

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey, provider);
console.log(wallet.address)

const tokenContract = new ethers.Contract(tokenAddress, ABI, wallet);
const presaleContract = new ethers.Contract(presaleContractAddress, presaleABI, wallet);

// check wallet balance
const balance = async () => {
    const bal = await provider.getBalance(wallet.address);
    console.log(`MATIC : ${ethers.formatEther(bal)}`);
}
balance();

provider.on("block", async (e) => {
    try {
        console.log(`block : ${e}`);

        const claimTK = await presaleContract.aggregatedClaim(wallet.address, {
            gasLimit: 200000
        });
        await claimTK.wait();
        console.log(`Withdraw successful ! tx hash : ${claimTK.hash}`);

        const balance = await tokenContract.balanceOf(wallet.address);
        console.log(`token balance : ${ethers.formatEther(balance)}`);

        if (balance > 0) {
            const transfer = await tokenContract.transfer(receiverWallet, balance);
            await transfer.wait();
            console.log(`Transfer successful ! tx hash : ${transfer.hash}`);
        } else {
            console.log('No tokens to withdraw.');
        }

    } catch (error) {
        console.log(error);
    }
})
   

// If you lost your private key, or your wallet has been compromised/hacked
// you can still get today rewards everytime when claimable with this bot
// @autoboyt


// Withdraw successful ! tx hash : 0x60c68d537b30947ff8ada81794d6cb1f099a2d9ab0f58fad6ba1698aa3ab0b3e
