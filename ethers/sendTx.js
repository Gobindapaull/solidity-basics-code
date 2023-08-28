require('dotenv').config()
const ethers = require('ethers')

const privateKey = process.env.PRIVATE_KEY
const url = process.env.URL

const provider = new ethers.JsonRpcProvider(url)
const wallet = new ethers.Wallet(privateKey)
const signer = wallet.connect(provider)

const etherToWei = ethers.parseEther("12345")
console.log(etherToWei)

const main = async () => {
    const blockNumber = await provider.getBlockNumber()
    const bal = await provider.getBalance('0x9A6034c84cd431409Ac1a35278c7Da36FfDa53E5')
    const balance = ethers.formatEther(bal)
    const nonce = await provider.getTransactionCount('0x9A6034c84cd431409Ac1a35278c7Da36FfDa53E5')

    const tx = await signer.sendTransaction({
        to: "0x9A6034c84cd431409Ac1a35278c7Da36FfDa53E5",
        value: ethers.parseEther("0.0000001")
      });
      
      const receipt = await tx.wait();
      console.log(receipt)
}
main()
