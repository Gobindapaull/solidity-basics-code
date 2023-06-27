// nonce
const nonce = provider.getTransactionCount("vitalik.eth")
nonce.then((nonce) => console.log('nonce: ', nonce))
