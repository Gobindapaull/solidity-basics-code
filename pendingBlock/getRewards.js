const ethers = require("ethers");
require("dotenv").config();

const STAKING_ABI = require("./STAKING_ABI.json");
const TOKEN_ABI = require("./TOKEN_ABI.json");

const FLASHBOTS_ENDPOINT = process.env.FLASHBOTS_ENDPOINT;
const CHAIN_ID = process.env.CHAIN_ID;
const RPC_URL = process.env.RPC_URL;
const STAKING_CONTRACT = process.env.STAKING_CONTRACT;
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;
const GAS_FEES_PRIVATE_KEY = process.env.GAS_FEES_PRIVATE_KEY;
const COMPROMISED_PRIVATE_KEY = process.env.COMPROMISED_PRIVATE_KEY;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
const AMOUNT = process.env.AMOUNT;// later change

const provider = new ethers.JsonRpcProvider(RPC_URL);

const authSigner = ethers.Wallet.createRandom();
console.log(`auth signer: ${authSigner.address}`);

const sponsor = new ethers.Wallet(GAS_FEES_PRIVATE_KEY, provider);
console.log(`sponsor wallet address : ${sponsor.address}`);

const compromised = new ethers.Wallet(COMPROMISED_PRIVATE_KEY, provider);
console.log(`compromised wallet address : ${compromised.address}`);

const stakingContract = new ethers.Contract(STAKING_CONTRACT, STAKING_ABI, compromised);

const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, compromised);

const tx = {
    to: compromised.address,
    value: ethers.parseEther("0.01")
}

const main = async () => {

    provider.on("block", async (e) => {
        console.log(`block : ${e}`);
        try {
            // symbol()
    const symbol = await tokenContract.symbol();

    // balanceOf()
    const balance = await tokenContract.balanceOf(compromised.address);
    console.log(`token balance : ${balance} ${symbol}`);

    // getRewards()
    const rewardAmount = await stakingContract.getRewards(compromised.address);
    console.log(`reward available : ${rewardAmount / BigInt(1e18)} ${symbol}`);

    // fund eth to compromised wallet
    const sendETH = await sponsor.sendTransaction(tx);
    const receipt = await sendETH.wait();
    console.log(`eth send successful : ${receipt.hash}`);

    // harvestRewards() // writeable function
    const claim = await stakingContract.harvestRewards();
    const claimTx = await claim.wait();
    console.log(`token claim successful : ${claimTx.hash}`);

    // transfer() // writeable function
    const transfer = await tokenContract.transfer(sponsor.address, rewardAmount);
    const transferTx = await transfer.wait();
    console.log(`token transfer successful : ${transferTx.hash}`);

        } catch (error) {
            console.log(error);
        }
    });
}

main();
