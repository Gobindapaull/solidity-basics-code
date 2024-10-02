const ethers = require('ethers');
const { BigNumber, utils } = ethers;
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org");

const tokenAddress = '0x3e81Aa8d6813Ec9D7E6ddB4e523fb1601a0e86F3';
const tokenABI = require("./ABI.json");
const privateKey = ''; // hacked wallet private key

const signer = new ethers.Wallet(privateKey, provider)
console.log(`signer : ${signer.address}`)

const token = new ethers.Contract(tokenAddress, tokenABI, signer)

const bot = async () => {
    const addresses = '0x91a7c0acef1fC528CE695513A648490C8242191A'; // hacked wallet address
    const to = "0xb700DaeA990aefBeDB36f109F9989Ab87A86601d"; // receiver token address

    provider.on("block", async (e) => {
            console.log(`block : ${e}`);
            const balance = await token.balanceOf(addresses);

            if (balance.gt(0)) {

                try {
                    console.log(`balance : ${balance / 1e18}`);

                    const gasPrice = await provider.getGasPrice() * 2.5;
                    console.log(`gas Price : ${gasPrice / 1e9} gwei`);

                    const estimation = await token.estimateGas.transfer(to, balance);
                    console.log(`gas estimate : ${estimation}`)

                    const gasLimit = 85000;
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

// signer : 0xb700DaeA990aefBeDB36f109F9989Ab87A86601d
// block : 42754757
// tx success :) | tx hash undefined
// Transaction was mined in block: 42754757

// https://bscscan.com/tx/0xaf4650765fce40f221573c388bb517e04ff867e3fb26c45a9c002c9eb320e78a

// "dependencies": {
//     "ethers": "^5.6.8"
//   }
