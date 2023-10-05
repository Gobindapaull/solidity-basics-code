require('dotenv').config()
const ethers = require('ethers')

const privateKey = process.env.PRIVATE_KEY
const url = process.env.URL

const provider = new ethers.JsonRpcProvider(url)
const wallet = new ethers.Wallet(privateKey)
const signer = wallet.connect(provider)

const main = async () => {

    const tx = await signer.sendTransaction({
        to: "",
        value: ethers.parseEther("0.000001")
      });
      
      const receipt = await tx.wait();
      console.log(receipt)
}
main()

// .env
// PRIVATE_KEY=
// URL=https://bsc-dataseed.binance.org/

  // "dependencies": {
  //   "dotenv": "^16.3.1",
  //   "ethers": "^6.7.1"
  // }
