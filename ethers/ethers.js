const ethers = require('ethers')

console.log('ethers version: ', ethers.version)
// 6.6.2

console.log('eth symbol: ', ethers.EtherSymbol)
//  Ξ

console.log('Random wallet address: ', ethers.Wallet.createRandom().address)
// 0xB024A5aC4C18dFC55b028895d6877BA5f3268d42

console.log('Random wallet phrase: ', ethers.Wallet.createRandom().mnemonic.phrase)
// bone protect toilet high shoulder siege pull today obscure online lottery borrow

console.log('Address from phrase: ', ethers.Wallet.fromPhrase("clutch profit climb praise ghost squeeze midnight curious worth muscle extra margin").address)
// 0xcaF038dB4d4Cc64C5A9707559ab77CE65EB0beC6

console.log('Zero address: ', ethers.ZeroAddress)
// 0x0000000000000000000000000000000000000000

console.log('Maximum Int 256: ', ethers.MaxInt256)
// 57896044618658097711785492504343953926634992332820282019728792003956564819967n

console.log(new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/"))
// JsonRpcProvider {}
