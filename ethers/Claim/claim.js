const ethers = require('ethers')
const { BigNumber, utils } = ethers;
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth")

const tokenAddress = '0x3A18B916B72FCaB7ba7d2882EEB4CCcEa7f4FF42'
const tokenABI = [{"inputs":[{"internalType":"contract IERC20","name":"_VEMP","type":"address"},{"internalType":"address","name":"_adminaddr","type":"address"},{"internalType":"uint256","name":"_VEMPPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VEMP","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VEMPPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"accessETHTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_adminaddr","type":"address"}],"name":"admin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingVEMP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accVEMPPerShare","type":"uint256"},{"internalType":"uint256","name":"accETHPerShare","type":"uint256"},{"internalType":"uint256","name":"lastTotalETHReward","type":"uint256"},{"internalType":"uint256","name":"lastETHRewardBalance","type":"uint256"},{"internalType":"uint256","name":"totalETHReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalETHStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalETHUsedForPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRewardPerBlock","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"rewardETHDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
const privateKey = ''
// 0x19366A5929BD190b342E85d64034474e87f63234

const signer = new ethers.Wallet(privateKey, provider)
console.log(`signer : ${signer.address}`)

const token = new ethers.Contract(tokenAddress, tokenABI, signer)

const bot = async () => {
    const addresses = ['0x19366A5929BD190b342E85d64034474e87f63234']
    const to = "0x5c462E1f844385Fa934890f0788bE02cD2415a39"

    provider.on("block", async () => {

        const blockNumber = await provider.getBlockNumber()
        console.log(`${blockNumber}`)
        console.log(`watching ....`)
        
        for (let i = 0; i < addresses.length; i++) {

            const balance = await token.userInfo(addresses[i])
            console.log(`amount available to claim : ${BigInt(balance["amount"]).toString()}`)

            if (BigInt(balance["amount"]).toString() > 0) {

                try {
                   
                    const gasPrice = await provider.getGasPrice()
                    console.log(`gas Price : ${gasPrice/1e9} gwei`)

                    const estimation = await token.estimateGas.claimETH();
                    console.log(`gas estimate : ${estimation}`)

                    const gasLimit = 100000
                    const maxGasFee = BigNumber.from(gasLimit).mul(gasPrice)
                    console.log('Tx gas price: ', ethers.utils.formatEther(maxGasFee));

                    const tx1 = await token.claimETH(
                        {
                            gasPrice: gasPrice,
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
