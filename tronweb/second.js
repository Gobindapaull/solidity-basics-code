const TronWeb = require("tronweb")
require('dotenv').config()

const HttpProvider = TronWeb.providers.HttpProvider
const fullNode = new HttpProvider("https://api.trongrid.io")
const solidityNode = new HttpProvider("https://api.trongrid.io")
const eventServer = new HttpProvider("https://api.trongrid.io")

const privateKey= process.env.PRIVATE_KEY
const mnemonicKey = process.env.MNEMONIC
const USDT = process.env.USDT

// create an instance
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey)

// console.log(tronWeb.trx)
// console.log(tronWeb.transactionBuilder)
// console.log(tronWeb.utils)

// Convert Base58 format address to Hex
const hexAddress = tronWeb.address.toHex("TAio4RNvh3sJnXkAhEtrS3Ui386YqTytR3")
console.log(hexAddress)
// 41083e51073c6e56ec51cc1c5a1b0f36441d37d5e2

// Convert Hexstring format address to Base58 format address
const base58 = tronWeb.address.fromHex("41083e51073c6e56ec51cc1c5a1b0f36441d37d5e2")
console.log(base58)
// TAio4RNvh3sJnXkAhEtrS3Ui386YqTytR3

// *** derive address from private key
const tronAddress = tronWeb.address.fromPrivateKey(privateKey)
console.log(tronAddress)
// TAio4RNvh3sJnXkAhEtrS3Ui386YqTytR3

// *** Generate a new private key and address
const newAddress = tronWeb.createAccount()
// console.log(newAddress)

// *** Generate a random mnemonic (total number 12)
const mnemonic = tronWeb.createRandom()
const mnemonic2 = tronWeb.createRandom({
    path: "m/44'/195'/0'/0/0",
    extraEntropy: "Hello World",
    locale: 'en'
})
// console.log(mnemonic)
// console.log(mnemonic2)

// Convert ASCII to HEX
const asciiToHex = tronWeb.fromUtf8("test")
console.log(asciiToHex)
// 0x74657374

// Convert number to hexadecimal string
const numToString = tronWeb.fromDecimal("343")
console.log(numToString)
// 0x157

// *** derive address and private key from mnemonic
const fromMnemonic = tronWeb.fromMnemonic(mnemonicKey)
// console.log(fromMnemonic)
// console.log(fromMnemonic.privateKey)

// *** Convert SUN to TRX (1 SUN = 0.000001 TRX)
const sunToTrx = tronWeb.fromSun("12345")
console.log(sunToTrx)
// 0.012345

// *** Convert TRX to SUN
const trxToSun = tronWeb.toSun(100)
console.log(trxToSun)
// 100000000

// Convert UTF8 to HEX
const utf8ToHex = tronWeb.fromUtf8("tron explorer")
console.log(utf8ToHex)
// 0x74726f6e206578706c6f726572

// Convert HEX to UTF8
const hexToUtf8 = tronWeb.toUtf8("0x74726f6e206578706c6f726572")
console.log(hexToUtf8)

// return all events within a transactionID
tronWeb.getEventByTransactionID("dce637c72d277bfd9599291c47733d5d36029b8ba108e6c40265fb14dc4fe056").then(
    // result => console.log(result)
)

// Returns all events
tronWeb.getEventResult(USDT, { eventName: "Transfer", size: 2}).then(
    // result => console.log(result)
)

// *** Check if a given address is valid
const isAddress = tronWeb.isAddress(USDT)
console.log(isAddress)
// true

// *** Check if tronWeb is connected to the nodes and event server
tronWeb.isConnected().then(
    result => console.log(result)
)

// set default block
const setDefault = tronWeb.setDefaultBlock()
const latestBlock = tronWeb.setDefaultBlock("latest")
const earliest = tronWeb.setDefaultBlock("earliest")
const setBlock = tronWeb.setDefaultBlock(56336766)

console.log(setDefault)
console.log(latestBlock)
console.log(earliest)
console.log(setBlock)

// *** set private key for obtaining the address, signing transactions and getting balances
const setPrivateKey = tronWeb.setPrivateKey(privateKey)
const defaultPrivateKey = tronWeb.defaultPrivateKey
console.log(defaultPrivateKey)

// *** sh3 any value using keccak256
const hash = tronWeb.sha3("give me a good hash")
// console.log(hash)
// 0x7c80c628b45ab77def849f4d9b3e2a360132c5a26dbd617fae0836c8414aa7e0

// *** Convert HEX string to ASCII string
const hexToAscii = tronWeb.toAscii("0x74726f6e")
// console.log(hexToAscii)
// tron

// *** Convert a given number or hexadecimal string to a BigNumber
const value = tronWeb.toBigNumber("12345")
// console.log(value)
// console.log(value.toNumber())

// *** Convert a hexadecimal to a decimal number
const decimal = tronWeb.toDecimal('0x16')
// console.log(decimal)
// 2

// *** Convert any value to HEX
const val = tronWeb.toHex("abcABC")
// console.log(val)
// 0x616263414243
