// "dependencies": {
//     "dotenv": "^16.3.1",
//     "ethers": "^6.8.1"
//   }


const ethers = require('ethers')
require('dotenv').config()

const privateKey = process.env.PRIVATE_KEY
const url = process.env.URL

const provider =  new ethers.JsonRpcProvider(url)

const wallet = new ethers.Wallet(privateKey, provider)
const receiver = "0xB580f1Ea6bb64E1F5b29836aa71CbbdA02EBd9c4"
const sender = "0x8d0962B42E1bbCA0B1b606a19924fb4E3E945167"
const amountBNBSend = "0.00001"


const tx = {
    to: receiver,
    value: ethers.parseEther(amountBNBSend)
}

// transfer ETH/BNB

async function transferBNB() {
    const bal = await provider.getBalance(sender)
    const balance = ethers.formatEther(bal)
    console.log('BNB balance: ', balance)

    const sendTx = await wallet.sendTransaction(tx)
    const sentTx = sendTx.wait()
    console.log(`tx hash : https://bscscan.com/tx/${sendTx.hash}\n nonce : ${sendTx.nonce}\n value : ${ethers.formatEther(sendTx.value)}`)
    
}

transferBNB()
