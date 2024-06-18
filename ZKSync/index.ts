import {Provider, types, utils, Wallet} from "zksync-ethers"
import { ethers, toUtf8Bytes, hexlify, Interface } from "ethers"

const provider = Provider.getDefaultProvider(types.Network.Sepolia)
const ethProvider = ethers.getDefaultProvider("sepolia")
const privateKey = "0xaac852203162c5bfbffab842e40d9c8776e238ae0bb14d48f0eda4ebea02d046"
const wallet = new Wallet(privateKey, provider, ethProvider)

const paymasterAddress = "0x paymaster address"
const contractAddress = "0x contract address"

const abi = ["function name() external view returns(uint8)"]
const iface = new Interface(abi)

async function main() {
    
    try {

    console.log(`wallet address : ${wallet.address}`)
    console.log(`wallet balance : ${await wallet.getBalance()}`)

    const tx = await wallet.sendTransaction({
        type: utils.EIP712_TX_TYPE,
        to: contractAddress,
        data: iface.encodeFunctionData("setMessage", ["change you data here"]),
        customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: utils.getPaymasterParams(paymasterAddress, {
                type: "General",
                innerInput: new Uint8Array()
            })
        }
    })

    await tx.wait()
    console.log(`tx hash : ${tx.hash}`)

    } catch (error) {
        console.log(error)
    }
}

main()
