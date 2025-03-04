const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com");

const abi = require("./ABI.json");
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log(signer.address);



async function multiSend() {
    const contractAddress = "0xbbf4C8D4E6a7AEB4Ee415CeC614477D6751c939E";
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const recipients = ["0x9C7264A063Dd700C5Fb483e800cD4006E796C3a3", "0x284A9C889D0A26fba9414FC5Fd093C7Ca393413B", "0xb700DaeA990aefBeDB36f109F9989Ab87A86601d"];

    const amount = ethers.parseEther("0.0001")
    const amounts = [amount, amount, amount];

    const tx = await contract.multisend(recipients, amounts, {
        value: ethers.parseEther("0.01")
    });

    await tx.wait();
    console.log("Transaction sent : ", tx.hash);

}

multiSend();

// "dependencies": {
//     "dotenv": "^16.4.7",
//     "ethers": "^6.13.5"
//   }
