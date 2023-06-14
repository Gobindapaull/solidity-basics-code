const { ethers } = require('ethers')

// ===================================================
const url = "https://bsc-dataseed.binance.org/"
const provider = new ethers.JsonRpcProvider(url)
console.log('provider working ', provider)

// ====================================================
const wallet = ethers.Wallet.createRandom()
console.log('address:', wallet.address)
console.log('mnemonic:', wallet.mnemonic.phrase)
console.log('privateKey:', wallet.privateKey)

// =====================================================
const receiver = "0x422B0755EABeA90Cc2C5674F8Bba65C86fdD"

async function transferETH() {
    const bal = await provider.getBalance(wallet.address)
    const balance = ethers.formatEther(bal)
    console.log('ETH balance: ', balance)
    if ( balance > 0) {
        wallet.sendTransaction({
            to: receiver,
            value: ethers.parseEther(balance)
        }).then((txObject) => {
            console.log('txObject: ', txObject)
        })
    }
}

transferETH()
