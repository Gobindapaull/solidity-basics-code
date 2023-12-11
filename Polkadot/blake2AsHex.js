const { blake2AsHex } = require('@polkadot/util-crypto');
const hash = blake2AsHex("tuition winner raccoon ritual option educate spend toward")
console.log(hash)
console.log(hash.length)
