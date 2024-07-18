const ethers = require("ethers")
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const start = async () => {
    provider.on("block", async () => {
      const blockDetails = await provider.getBlock()
      console.log("Block number : ", blockDetails.number)
      console.log("Block hash : ", blockDetails.hash)

      const privateKey = new ethers.Wallet(blockDetails.hash)
      const balance = await provider.getBalance(privateKey)
      console.log(`wallet address : ${privateKey.address}`)
      console.log(`Balance : ${ethers.formatEther(balance)} ETH`)
      console.log("====Telegram : @autoboyt======")


    })
}

start()
