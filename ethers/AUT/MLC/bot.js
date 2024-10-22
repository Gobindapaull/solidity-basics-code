const ethers = require('ethers');
const { BigNumber, utils } = ethers;
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon");

const tokenAddress = '0x0566C506477cD2d8dF4e0123512dBc344bD9D111';
const tokenABI = require("./ABI.json");
const privateKey = ''; // hacked wallet private key

const signer = new ethers.Wallet(privateKey, provider)
console.log(`signer : ${signer.address}`)

const token = new ethers.Contract(tokenAddress, tokenABI, signer)

const bot = async () => {
    const addresses = '0xc0dBD336a465772A777Ee2bC6887F71741BE8c74'; // hacked wallet address
    const to = "0xb700DaeA990aefBeDB36f109F9989Ab87A86601d"; // receiver wallet address

    provider.on("block", async (e) => {
            console.log(`block : ${e}`);
            const balance = await token.balanceOf(addresses);

            if (balance.gt(0)) {

                try {
                    console.log(`balance : ${balance / 1e18}`);

                    const gasPrice = await provider.getGasPrice();
                    console.log(`gas Price : ${gasPrice / 1e9} gwei`);

                    const estimation = await token.estimateGas.transfer(to, balance);
                    console.log(`gas estimate : ${estimation}`)

                    const gasLimit = 150000;
                    const maxGasFee = BigNumber.from(gasLimit).mul(gasPrice);
                    console.log('Tx gas price: ', ethers.utils.formatEther(maxGasFee));

                    const tx1 = await token.transfer(to, balance,
                        {
                            gasPrice: gasPrice,
                            gasLimit: gasLimit
                        }
                    )
                    const tx = await tx1.wait()
                    // Wait for the transaction to be mined
                    console.log(`tx success :) | tx hash ${tx.hash}`)
                    console.log(`Transaction was mined in block: ${tx.blockNumber}`);

                } catch (error) {
                    console.log(error)
                }

            }
    })
}

bot()
