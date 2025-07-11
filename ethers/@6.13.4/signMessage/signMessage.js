const ethers = require("ethers");

const privateKey = "0xb0f6de02fb4d6e2ee6e616a18e5aa2325c92ebe180edfa2391ff9f83c088d1c7"

const wallet = new ethers.Wallet(privateKey);
console.log(wallet.address);

const message = "Sign it !!";

const main = async () => {
    const signature = await wallet.signMessage(message);
    console.log(`Signature: ${signature}`);
}


main();
