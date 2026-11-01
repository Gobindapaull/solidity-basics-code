const ethers = require("ethers")
require("dotenv").config()

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const MULTI_SEND_ADDRESS = process.env.MULTI_SEND_ADDRESS
const TO = process.env.RECEIVER_ADDRESS
const amount = process.env.AMOUNT

const MULTI_SEND_ABI = ["function multiSend(bytes memory transactions) public payable"]

async function main() {
    const network = await provider.getNetwork();

    if (network.chainId !== 11155111n) {
        throw new Error("Not connected to Sepolia");
    }

    const txValue = ethers.parseEther(amount);

    const multisendContract = new ethers.Contract(
        MULTI_SEND_ADDRESS,
        MULTI_SEND_ABI,
        wallet
    );

    const packedData = ethers.solidityPacked(
        ["uint8", "address", "uint256", "uint256", "bytes"],
        [
            0,
            TO,
            txValue,
            0,
            "0x"
        ]
    )

    console.log("Wallet:", wallet.address);
    console.log("Packed data:", packedData);

    // Simulate before sending
    await multisendContract.multiSend.staticCall(packedData, {
        value: txValue
    });

    console.log(`Simulation successful`)

    // Send ONE transaction
    const tx = await multisendContract.multiSend(packedData, {
        value: txValue
    });

    console.log("Transaction:", tx.hash);

    const receipt = await tx.wait();

    console.log("Status:", receipt.status === 1 ? "Success" : "Failed");
}

main()

// Ethereum MultiSend Smart Contract +  Script
// Telegram: @autoboyt
