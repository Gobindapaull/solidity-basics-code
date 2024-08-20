const Web3 = require("web3") //  "web3": "^1.4.0"

const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org"))

const myAddress = ""

const currentBlock = web3.eth.blockNumber
// console.log(`Latest block : ${currentBlock}`)

const n = web3.eth.getTransactionCount(myAddress, currentBlock).then(x => {console.log(`nonce : ${x}`)})

const bal = web3.eth.getBalance(myAddress, currentBlock).then(a => {console.log(`Balance : ${a/1e18}`)})


for (let i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
    try {
       const block = eth.block(i, true)  
       if (block && block.transactions) {
        {
            block.transactions.forEach((e) => {
                if (myAddress == e.from) {
                    if (e.from != e.to) {
                        bal = bal.plus(e.value)
                        console.log(i, e.from, e.to, e.value.toString(10))
                        --n
                    }
                    if (myAddress == e.to) {
                        if (e.from != e.to) {
                            bal = bal.minus(e.value) 
                            console.log(i, e.from, e.to, e.value.toStrig(10))
                        }
                    }
                }
            })
        }
       }
    } catch (error) {
        console.log(`error for block : ${i} -- ${error}`)
    }
}
