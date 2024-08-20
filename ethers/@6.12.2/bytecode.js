const ethers = require("ethers") // "ethers": "^6.13.2"
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org")
provider.getCode("0x0000000000000000000000000000000000001000").then(x => {console.log(x)})
