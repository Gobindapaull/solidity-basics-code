const ethers = require("ethers")
const crypto = require("crypto")


const main = async () => {
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth")

    const getBlockNumber = await provider.getBlockNumber()
    console.log(getBlockNumber)

    const id = crypto.randomBytes(32)
    const key = id.toString("hex")
    const idLen = id.length
    const wallet = new ethers.Wallet(key, provider)

    console.log(key) // 944d304f4924a77339326d15b72087605d43f878ab1361251d527732e8b2f867
    console.log(wallet.address)
    console.log(await provider.getBalance(wallet.address))
    console.log(idLen)
    // TronLink = THdoRo7VNcJFdDtbkcLjHPSKTMwYbrqQ8y

}

main()
