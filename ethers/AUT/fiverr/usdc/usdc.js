const ethers = require('ethers')
const { BigNumber, utils } = ethers;
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
const tokenAddress = process.env.TOKEN_ADDRESS;
const tokenABI = require("./ABI2.json");
const privateKey = process.env.PRIVATE_KEY;

const signer = new ethers.Wallet(privateKey, provider)
console.log(`signer : ${signer.address}`)

const token = new ethers.Contract(tokenAddress, tokenABI, signer)

const bot = async () => {
    const addresses = [process.env.WALLET_ADDRESS];
    const to = process.env.RECEIVER_ADDRESS;

    provider.on("block", async (e) => {

        console.log(`Block number: ${e}`);

        const gasPrice = await provider.getGasPrice()
        console.log(`gas Price : ${gasPrice/1e9} gwei`)
        
        for (let i = 0; i < addresses.length; i++) {

            const balance = await token.balanceOf(addresses[i]);

            if (balance.gt(0)) {

                try {
                    console.log(`balance : ${balance/1e6}`)

                    const gasPrice = await provider.getGasPrice() * 1.6;
                    console.log(`gas Price : ${gasPrice/1e9} gwei`)

                    const estimation = await token.estimateGas.transfer(to, balance);
                    console.log(`gas estimate : ${estimation}`)

                    const gasLimit = estimation;

                    const tx1 = await token.transfer(to, balance,
                        {
                            gasLimit: gasLimit
                        }
                    )
                    const tx = await tx1.wait()
                    console.log(`tx success :) | tx hash ${tx.hash}`)

                } catch (error) {
                    console.log(error)
                }
               
            }
        }
    })
}

bot()

// https://etherscan.io/tx/0xa583c76207888664ec896f02b440e8763526e2e31f6b38d0d52b0590dfad43a0
