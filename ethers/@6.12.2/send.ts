import { ethers } from "ethers"
import dotenv from "dotenv"
dotenv.config()

const rpc = process.env.RPC_URL
const privateKey = process.env.PRIVATE_KEY

const main = async () => {
    if (!rpc) {
        throw new Error("rpc not found")
    }
    if (!privateKey) {
        throw new Error("invalid private key")
    }
    const provider = new ethers.JsonRpcProvider(rpc)
    const signer = new ethers.Wallet(privateKey, provider)
    console.log(signer.address)

    try {
        const tx = {
            to: signer.address,
            value: ethers.parseEther("0.00001"),
            data: ethers.hexlify(ethers.toUtf8Bytes("sending native token using ethers.js"))
        }
        const transaction = await signer.sendTransaction(tx)
        console.log('tx hash : ', transaction.hash)

        const receipt = await transaction.wait()
        console.log('receipt : ', receipt)

    } catch (error) {
        console.log(error)
    }
}

main()

// 0x58eAaeb28c4DdEB69bd318dcb67aaF4CF80DcE21
// tx hash :  0x8c9a2568740b4bb66ec9c0561d2faa7e2db06e70bb37e57adf86e380568ceae8

// "dependencies": {
//     "dotenv": "^16.4.5",
//     "ethers": "^6.13.1"
//   }
