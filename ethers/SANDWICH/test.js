const ethers = require("ethers")
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")

const wallet = new ethers.Wallet("0x9c10a5cb59abbdeba2fd671362a4764b39265b9a81a860dc0c06f004852960bc")
const signer = wallet.connect(provider)
console.log(`signer address : ${signer.address}`)

const pancakeswapRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"
const ABI = require("../abi/panABI.json")
const contract = new ethers.Contract(pancakeswapRouterAddress, ABI, signer)

provider.on("pending", async (tx) => {
    const txInfo = await provider.getTransaction(tx)

    if (txInfo != null) {
        if (txInfo.to == pancakeswapRouterAddress) {
            console.log("TX FOUND :)")
            console.log(txInfo.hash)
            console.log(ethers.formatEther(txInfo.value) > 0.5 ? ethers.formatEther(txInfo.value) : "too low")
            console.log("............................................")
        }
    }
})

const SandwichBot = async () => {
    const WETH = await contract.WETH()
    console.log(`WETH address : ${WETH}`)

    const factory = await contract.factory()
    console.log(`FACTORY address : ${factory}`)

}


SandwichBot()
