const ethers = require("ethers")
require("dotenv").config()

async function main() {
    try {
        console.log("RPC:", process.env.RPC_URL)
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
        const network = await provider.getNetwork()

        console.log("Chain ID:", network.chainId)
        console.log("Network:", network.name)
    } catch (error) {
        console.log(error)
    }
}
