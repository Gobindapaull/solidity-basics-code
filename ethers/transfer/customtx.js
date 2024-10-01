const ethers = require("ethers");
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org");
const privateKey = "";

const main = async () => {
    const signer = new ethers.Wallet(privateKey, provider);
    console.log(signer.address);

    const block = await provider.getBlockNumber();
    console.log(block);

    const nonce = await provider.getTransactionCount(signer.address);
    console.log(nonce);

    // Get the balance
    const balance = await provider.getBalance(signer.address);
    console.log(`Balance of ${signer.address}: ${ethers.formatEther(balance)} BNB`);

    const gasLimit = 99999;
    const gasPrice = (await provider.getFeeData()).gasPrice * 3n;


    const tx = {
        to: "0x91a7c0acef1fC528CE695513A648490C8242191A",
        value: ethers.parseEther("0.00001"),
        gasPrice: gasPrice,
        gasLimit: gasLimit
    }

    // Send a transaction
    const transactionResponse = await signer.sendTransaction(tx);
    console.log(`Transaction hash: ${transactionResponse.hash}`);

    // Wait for the transaction to be mined
    const receipt = await transactionResponse.wait();
    console.log(`Transaction was mined in block: ${receipt.blockNumber}`);

}

main();

// "dependencies": {
//     "ethers": "^6.13.3"
//   }
// https://bscscan.com/tx/0xf7e4471dec6b277e71284a6805ef3418e923a385dcefccf64a2e065d9c3ce7af
