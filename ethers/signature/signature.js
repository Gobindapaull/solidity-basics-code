const { ethers } = require("ethers")

// script to generate a signature and extract v, r, and s

async function main() {
    // Create a wallet
    const wallet = ethers.Wallet.createRandom()
    console.log(`wallet address: ${wallet.address} | private key: ${wallet.privateKey}`)

    // Sign a message
    const signature = await wallet.signMessage("approve the transaction")
    console.log(`signature: ${signature}`)

    // Split signature into v, r, s
    const sig = ethers.Signature.from(signature)

    console.log(`v: ${sig.v}`)
    console.log(`r: ${sig.r}`)
    console.log(`s: ${sig.s}`)
}

main()
