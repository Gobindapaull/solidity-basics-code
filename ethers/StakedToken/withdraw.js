const ethers = require("ethers");
require("dotenv").config();

const STAKING_ABI = require("./STAKING_ABI.json");
const TOKEN_ABI = require("./TOKEN_ABI.json");

const RPC_URL = process.env.RPC_URL;
const STAKING_CONTRACT = process.env.STAKING_CONTRACT;
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;
const GAS_FEES_PRIVATE_KEY = process.env.GAS_FEES_PRIVATE_KEY;
const COMPROMISED_PRIVATE_KEY = process.env.COMPROMISED_PRIVATE_KEY;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

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
            console.log(`token balance : ${ethers.formatEther(balance)} ${symbol}`);

            // poolStakers()
            const stakedAmount = await stakingContract.poolStakers(compromised.address);
            console.log(`Staked amount : ${stakedAmount["amount"] / BigInt(1e18)} ${symbol}`);

            // withdraw() // writeable function
            const withdraw = await stakingContract.withdraw();
            const withdrawTx = await withdraw.wait();
            console.log(`token claim successful : ${withdrawTx.hash}`);

            // transfer() // writeable function
            const transfer = await tokenContract.transfer(sponsor.address, stakedAmount["amount"]);
            const transferTx = await transfer.wait();
            console.log(`token transfer successful : ${transferTx.hash}`);

        } catch (error) {
            console.log(error);
        }
    });
}

main();
