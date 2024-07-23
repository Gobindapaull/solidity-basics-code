import { ethers } from "ethers"
import { FlashbotsBundleProvider, FlashbotsBundleResolution } from "@flashbots/ethers-provider-bundle"
import { exit } from "process"

const RELAY = "https://relay-sepolia.flashbots.net"
const KEY_OWNER = ""
const KEY_HACKED = ""

const main = async () => {
    const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com")
    const signer = ethers.Wallet.createRandom()

    const flashbotsProvider = await FlashbotsBundleProvider.create(
        provider,
        signer,
        RELAY,
        "sepolia"
    )

    provider.on("block", async (blockNumber) => {
        console.log(`block : ${blockNumber}`)

        const targetBlock = blockNumber + 1

        const owner = new ethers.Wallet(KEY_OWNER).connect(provider)
        console.log(`owner wallet : ${owner.address}`)

        const hacked = new ethers.Wallet(KEY_HACKED).connect(provider)
        console.log(`hacked wallet : ${hacked.address}`)

        // const block = await provider.getBlock("latest")
        // const maxBaseFeeInTheFutureBlock = FlashbotsBundleProvider.getMaxBaseFeeInFutureBlock((block.baseFeePerGas), 1)
        const maxFee = '200'
        // console.log(ethers.formatEther(maxBaseFeeInTheFutureBlock))

        // const priorityFee = (await provider.getFeeData()).maxPriorityFeePerGas
        const priorityFee = '10'
        // console.log(ethers.formatEther(priorityFee))


        const signedTransactions = await flashbotsProvider.signBundle(
            [
                {
                    signer: owner,
                    transaction: {
                        chainId: 11155111,
                        type: 2,
                        to: hacked.address,
                        value: ethers.parseEther("0.0001"),
                        gasLimit: 30000,
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
                        value: ethers.parseEther("0.0002"),
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

// https://sepolia.etherscan.io/address/0x91a7c0acef1fc528ce695513a648490c8242191a
// https://sepolia.etherscan.io/address/0x91a7c0acef1fc528ce695513a648490c8242191a
