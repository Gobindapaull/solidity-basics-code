// wallet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
const signer = wallet.connect(provider)
console.log('signer: ', signer.address)
