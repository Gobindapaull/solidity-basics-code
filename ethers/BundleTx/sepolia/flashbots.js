import { ethers } from "ethers"
import { FlashbotsBundleProvider, FlashbotsBundleResolution } from "@flashbots/ethers-provider-bundle"
import { exit } from "process"

const RELAY = "https://relay-sepolia.flashbots.net"
const KEY_OWNER = ""
const KEY_HACKED = ""

const main = async () => {
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia")
    const signer = ethers.Wallet.createRandom()

    const flashbotsProvider = await FlashbotsBundleProvider.create(
        provider,
        signer,
        RELAY,
        "sepolia"
    )

    provider.on("block", async (blockNumber) => {
        console.log(`block : ${blockNumber}`)

        const targetBlock = blockNumber + 2

        const owner = new ethers.Wallet(KEY_OWNER).connect(provider)
        console.log(`owner wallet : ${owner.address}`)

        const hacked = new ethers.Wallet(KEY_HACKED).connect(provider)
        console.log(`hacked wallet : ${hacked.address}`)

        const maxFee = '50'
        const priorityFee = '5'

        const signedTransactions = await flashbotsProvider.signBundle(
            [
                {
                    signer: owner,
                    transaction: {
                        chainId: 11155111,
                        type: 2,
                        to: hacked.address,
                        value: ethers.parseEther("0.01"),
                        gasLimit: 22000,
                        maxFeePerGas: ethers.parseUnits(maxFee, 'gwei'),
                        maxPriorityFeePerGas: ethers.parseUnits(priorityFee, 'gwei')

                    }
                },
                {
                    signer: hacked,
                    transaction: {
                        chainId: 11155111,
                        type: 2,
                        to: owner.address,
                        value: ethers.parseEther("0.00002"),
                        gasLimit: 21001,
                        maxFeePerGas: ethers.parseUnits(maxFee, 'gwei'),
                        maxPriorityFeePerGas: ethers.parseUnits(priorityFee, 'gwei')

                    }
                }
            ]
        )

        const bundleSubmission = await flashbotsProvider.sendRawBundle(
            signedTransactions,
            targetBlock
        )

        if ('error' in bundleSubmission) {
            console.log(bundleSubmission.error.message)
            return
        }

        const resolution = await bundleSubmission.wait()
        if (resolution === FlashbotsBundleResolution.BundleIncluded) {
            console.log('working ...')
            console.log(`target block number : ${targetBlock}`)
            bundleSubmission.bundleTransactions.map((e) => {
                console.log(`tx hash : https://sepolia.etherscan.io/tx/${e.hash}`)
            })
            exit(0)
        } else if (
            resolution === FlashbotsBundleResolution.BlockPassedWithoutInclusion
        ) {
            console.log(`not inclued in the block ${targetBlock}`)
        } else if (resolution === FlashbotsBundleResolution.AccountNonceTooHigh) {
            console.log(`nonce high ...`)
            exit(0)
        }
    })
}

main()

// https://sepolia.etherscan.io/tx/0x1cc0f4656f969771d02f57e09363114c1254abafca49af485c6376c9f04b5b15
// https://sepolia.etherscan.io/tx/0x2a07c19b4e77fb9996dba8d8e3d330fa7c839ae65d5c3a5baacb533d4cea4221
