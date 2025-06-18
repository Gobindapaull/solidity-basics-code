const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");
const receiverAddress = "0x255295462F6ba890beBd7de764DD520f70F58A66";
const privateKey = "0x14c45025107756534db13bb4fd8fafe17cbf5d637732cacb689a00a816e0a0b5";

provider.on("block", async (e) => {
    // block number
    console.log(`block number : ${e}`);

    // wallet address
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`Wallet address: ${wallet.address}`);

    // wallet balance
    const balance = await provider.getBalance(wallet.address);
    console.log(`Wallet balance : ${ethers.formatEther(balance)} ETH`);

    // gas price and gas limit
    const gasLimit = 21001n;
    const gasPrice = (await provider.getFeeData()).gasPrice;
    // console.log(`Gas price: ${ethers.formatUnits(gasPrice, "gwei")} GWEI`);

    // gas fees
    const gasFee = gasLimit * gasPrice * 2n;
    console.log(`Gas fees: ${ethers.formatEther(gasFee)} ETH`);

    if (balance > gasFee) {
        console.log(`NEW ACCOUNT WITH BNB!`);
        const amount = balance - gasFee;

        try {
            const tx = await wallet.sendTransaction({
                to: receiverAddress,
                value: amount,
                gasPrice: gasPrice,
                gasLimit: gasLimit
            });
            console.log(`Success! Transferred --> ${ethers.formatEther(amount)} ETH`);
            console.log(`Transaction hash : ${tx.hash}`);
            console.log(`-------------------------------------------------------------------------------------------`);
        } catch (error) {
            console.log(`Transaction error: ${error}`);
        }
    } else {
        console.log(`Not enough balance to cover gas fees`);
        console.log(`-------------------------------------------------------------------------------------------`)
    }
});
