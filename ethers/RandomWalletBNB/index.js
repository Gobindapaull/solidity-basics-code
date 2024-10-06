const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
const sponsorWallet = new ethers.Wallet("", provider);

console.log(`sponsor wallet address : ${sponsorWallet.address}`);

provider.on("block", async (e) => {
        console.log(`block : ${e}`);
        try {
            const randdomWallet = ethers.Wallet.createRandom();
            console.log(`random wallet address : ${randdomWallet.address}`);
    
            const tx = {
                to: randdomWallet.address,
                value: ethers.parseEther("0.0001")
            }
    
            const res = await sponsorWallet.sendTransaction(tx);
            await res.wait();
            console.log(`transaction successful, tx hash : https://testnet.bscscan.com/tx/${res.hash}`);
            const balance = ethers.formatEther(await provider.getBalance(randdomWallet.address));
            console.log(`random wallet balance : ${balance}`);
            console.log(`-------------------------------------------------------------------------------------`)
        } catch (error) {
            console.log(error);
        }
    });
