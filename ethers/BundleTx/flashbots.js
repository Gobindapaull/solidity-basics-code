const { JsonRpcProvider, Wallet, ethers } = require("ethers")
const { FlashbotsBundleProvider, FlashbotsBundleResolution } = require("@flashbots/ethers-provider-bundle") 
const { exit } = require('process')
require('dotenv').config()

const FLASHBOTS_ENDPOINT = 'https://relay.flashbots.net'//change for mainnet
const CHAIN_ID = 1;
const recipientAddress = "0xb700DaeA990aefBeDB36f109F9989Ab87A86601d"; // Address where you want to send ERC20 tokens
const tokenAddress = "0xfAbA6f8e4a5E8Ab82F62fe7C39859FA577269BE3"; // Address of the ERC20 token contract
const amount = ethers.parseUnits("8000", 18);

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");

const authSigner = ethers.Wallet.createRandom();

const sponsor = new ethers.Wallet(process.env.SPONSOR_KEY).connect(provider);

const compromised = new ethers.Wallet(process.env.COMPROMISED_KEY).connect(provider);

const tokenContract = new ethers.Contract(tokenAddress, [
    "function transfer(address dst, uint256 rawAmount) external returns (bool)"
], compromised);

// Encode the function data for the transfer function
const transactionData = tokenContract.interface.encodeFunctionData(
    "transfer", 
    [recipientAddress, amount]
);

let i = 0;
const main = async () => {

    // bundle both the transaction
    const transactionBundle = [
        {   // send the compromised wallet some eth
            transaction: {
                chainId: CHAIN_ID,
                type: 2, // EIP 1559
                value: ethers.parseEther("0.02"),
                to: compromised.address,
                maxFeePerGas: ethers.parseUnits("100", "gwei"),
                maxPriorityFeePerGas: ethers.parseUnits("50", "gwei"),
                gasLimit: 50000,
            }, 
            signer: sponsor,
        },
            // Transfer Token
        {   transaction: {
                chainId: CHAIN_ID,
                type: 2, // EIP 1559
                value: 0,
                to: tokenAddress, //contract address
                maxFeePerGas: ethers.parseUnits("100", "gwei"),
                maxPriorityFeePerGas: ethers.parseUnits("50", "gwei"),
                gasLimit: 100000,
                data: transactionData,
            },
            signer: compromised, // ethers signer
        }
    ]

    console.log("Flashbots started...");

    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, authSigner, FLASHBOTS_ENDPOINT, 'mainnet')

    provider.on("block", async (blockNumber) => {

        console.log(`Current Block: ${blockNumber}`);
        const targetBlockNumber = blockNumber + 1;
        console.log(`Preparing bundle for next block: ${targetBlockNumber}`);

        const signedBundle = await flashbotsProvider.signBundle(transactionBundle);

        //run simulation
        console.log(new Date());
        const simulation = await flashbotsProvider.simulate(signedBundle, targetBlockNumber)
        console.log(new Date());
        if ("error" in simulation) {
            console.error(`Simulation error: ${simulation.error.message}`);
            return;
        }

        console.log("Simulation successful. Sending bundle.");

        //send bundle
        const flashbotsTransactionResponse = await flashbotsProvider.sendRawBundle(
            signedBundle,
            targetBlockNumber
        );


        console.log("Bundle response:", flashbotsTransactionResponse);

        if ("error" in flashbotsTransactionResponse) {
            console.error(`Error sending bundle: ${flashbotsTransactionResponse.error.message}`);
            return;
        }

        console.log(`Bundle sent, waiting for inclusion in block ${targetBlockNumber}`);

        // Wait for response
        const waitResponse = await flashbotsTransactionResponse.wait();
        console.log("Resolution:", waitResponse);

        if (waitResponse === FlashbotsBundleResolution.BundleIncluded) {
            console.log(`Success: Bundle included in block ${targetBlockNumber}`, waitResponse);
            exit(0);
        } else if (waitResponse === FlashbotsBundleResolution.BlockPassedWithoutInclusion) {
            console.log(`Warning: Bundle not included in block ${targetBlockNumber}`, waitResponse);
        } else if (waitResponse === FlashbotsBundleResolution.AccountNonceTooHigh) {
            console.error("Error: Nonce too high, exiting", waitResponse);
            exit(1);
        } else {
            console.error(`Unexpected waitResponse: ${waitResponse}`, waitResponse);
        }
        i++;

    })

}

main()
