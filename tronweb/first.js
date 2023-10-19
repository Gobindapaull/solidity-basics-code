const TronWeb = require('tronweb')
// console.log(TronWeb.providers)
// "https://api.trongrid.io"

const tronweb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
})
// console.log(tronweb)

const main = async () => {

    // Get Account Information
    tronweb.trx.getAccount("TXfufGWnNSgvgwDbyKU4JrkALhPRvT7EtR")
    .then(result => {
        console.log("Account Information : ",result)
    })

    // Owner Premission
    tronweb.trx.getAccount("TXfufGWnNSgvgwDbyKU4JrkALhPRvT7EtR")
    .then(result => {
        console.log("owner permission : ", result.owner_permission)
    })

    // TRX Balance
    tronweb.trx.getBalance("TXfufGWnNSgvgwDbyKU4JrkALhPRvT7EtR")
    .then(result => {
        console.log("TRX balance : ",tronweb.fromSun(result))
    }) 
    // 206.624601

    // Bandwidth Information
    tronweb.trx.getBandwidth("TXfufGWnNSgvgwDbyKU4JrkALhPRvT7EtR")
    .then(result => {
        console.log("Bandwidth available : ", result)
    })
    // 365
}

// main()

const create = async () => {
    const address = tronweb.address.fromPrivateKey("3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C146")
    const randomAddress = tronweb.createRandom()
    console.log(address)
    // TXfufGWnNSgvgwDbyKU4JrkALhPRvT7EtR

    console.log(randomAddress)
    console.log("address : ",randomAddress.address)
    console.log("private key : ",randomAddress.privateKey)

    console.log("connected to tron rpc : ",await tronweb.isConnected())
}

create()
