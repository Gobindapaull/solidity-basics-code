const Web3 = require('web3');

const URL = "https://mainnet.infura.io/v3/";
const web3 = new Web3(URL);

const newAccount = web3.eth.accounts.create();
console.log(newAccount);
