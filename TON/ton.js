import { getHttpEndpoint, getHttpEndpoints } from "@orbs-network/ton-access"
import { mnemonicToWalletKey } from "@ton/crypto"
import { fromNano, internal, TonClient, WalletContractV4 } from "@ton/ton"
import dotenv from "dotenv";
dotenv.config();

console.log(`TON BLOCKCHAIN`)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
    const mnemonic = process.env.MNEMONIC;
    const key = mnemonicToWalletKey(mnemonic.split(""))
    const wallet = WalletContractV4.create({ publicKey: (await key).publicKey, workchain: 0 })
    console.log(`wallet address : ${wallet.address}`)

    const endpoint = await getHttpEndpoint({ network: "mainnet" })
    const client = new TonClient({ endpoint })

    const balance = await client.getBalance(wallet.address)
    console.log(`wallet balance : ${fromNano(balance)}`)

    if (!await client.isContractDeployed(wallet.address)) {
        console.log("contract is not deployed")
    }

    const walletContract = client.open(wallet)
    const seqNo = await walletContract.getSeqno()
    await walletContract.sendTransfer({
        secretKey: (await key).secretKey,
        seqno: seqNo,
        messages: [
            internal({
                to: process.env.RECEIVER_ADDRESS,
                value: process.env.AMOUNT,
                body: "Test transfer TON",
                bounce: false
            })
        ]
    })

    let currentSeqNo = seqNo
    while (currentSeqNo == seqNo) {
        console.log("Waiting for transaction to confirm ...")
        await sleep(1500)
        currentSeqNo = await walletContract.getSeqno()
    }
    console.log("Transaction confirmed :)")

}

main()

