const ethers = require("ethers")
const ABI = require("./abi.json")

// MAIN WALLET PRIVATE KEY
const privateKey = "0x826a1a26add7c59b6a2e7c74eca3cc40f561ae823183f6f6903c6683a5d6e23e"
const url = "https://mainnet.base.org"
const tokenAddress = "0x7721693d0529199d4B68aB4c00f1213b16092Bf9"

const provider = new ethers.JsonRpcProvider(url)
const wallet = new ethers.Wallet(privateKey)
const signer = wallet.connect(provider)

const main = async () => {

    for (let i = 0; i < 100; i++) {
        try {
            // First: create a new wallet
            const receiver = ethers.Wallet.createRandom()
            const signer1 = new ethers.Wallet(receiver.privateKey, provider)
            console.log(receiver.privateKey)

            const contract = new ethers.Contract(tokenAddress, ABI, signer1)

            // Second: Send eth to the new created wallet
            const tx = {
                to: signer1.address,
                value: ethers.parseEther("0.000005")
            }
            const transaction = await signer.sendTransaction(tx)
            console.log('tx hash : ', transaction.hash)

            const receipt = await transaction.wait()
            console.log('receipt : ', receipt)

            // Third: Check wallet balance 
            const bal = await provider.getBalance(signer1)

            // Fourth: Wallet mint a new nft
            const mint = await contract.safeMint()
            const safeMint = await mint.wait()

            console.log(`Tx hash ${i} : `, safeMint.hash)
            console.log(`mint ${i} successful :)`)
        } catch (error) {
            console.log(error)
        }
    }
}

main()
