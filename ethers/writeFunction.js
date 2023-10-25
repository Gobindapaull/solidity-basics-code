const ethers = require("ethers");
const provider = new ethers.JsonRpcProvider(
  "https://goerli.infura.io/v3/"
);

const wallet = new ethers.Wallet(
  "0x2e1eaa355f3b0883e3f03037ae6bd4da404e50e34ffefba7672325d082e550ae"
);
console.log("owner : ", wallet.address);

const signer = wallet.connect(provider)

const tokenAddress = "0x205F2aCd3F666e2548C0aE69D5365678B5728fF4";
const ABI = require('./ABI.json')

const tokenContract = new ethers.Contract(tokenAddress, ABI, signer);

// change data according to yours need
const amount = 1
const withdrawAddress = "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5"
const withdrawAmount = 1
const taxVar = 3

const main = async () => {
    // KARMIC BURN
    const karmic = await tokenContract.KarmicBurn(amount)
    const karmicBurn = await karmic.wait()
    console.log('karmic Burn : ', karmic.hash)

    // WITHDRAW FUNDS
    const withdraw = await tokenContract.WithdrawFunds(withdrawAddress, withdrawAmount, taxVar)
    const withdrawFunds = await withdraw.wait()
    console.log('Withdraw Funds : ', withdrawFunds.hash)
}

main();

// owner :  0xC813eDb526830D24A2Ce5801d9Ef5026a3967529
// karmic Burn :  0x598511be1fd419d89a77340bf329024aacda0358bc745eafb598c3b27484439c
// Withdraw Funds :  0x2e1eaa355f3b0883e3f03037ae6bd4da404e50e34ffefba7672325d082e550ae
