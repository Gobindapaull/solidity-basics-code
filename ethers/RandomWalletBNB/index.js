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


    // https://testnet.bscscan.com/tx/0x8760b1d4e331749d4e67cdc115c7fa3e70d960e6f7de2634b7356bcc8ac3d0f5
    // https://testnet.bscscan.com/tx/0xf084b16711535569d5913b8684690497484949ceac388af972ed06b29de6f543
    // https://testnet.bscscan.com/tx/0x2020a10061d0c7b19f4aec2970870d953db28c9a9d9ace64a17a02a5d012792f
