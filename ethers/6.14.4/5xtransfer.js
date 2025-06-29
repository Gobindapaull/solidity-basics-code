import { ethers } from "ethers";

async function sendTransactionWithHigherGas() {
    // 1. Setup your provider and signer
    const RPC_URL = ""; 
    const PRIVATE_KEY = "";

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // 2. Get current fee data from the network
    const feeData = await provider.getFeeData();
    console.log("Current Fee Data:", {
        gasPrice: feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, "gwei") + " Gwei" : "N/A",
        maxFeePerGas: feeData.maxFeePerGas ? ethers.formatUnits(feeData.maxFeePerGas, "gwei") + " Gwei" : "N/A",
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei") + " Gwei" : "N/A",
    });

    // 3. Calculate 5x gas price
    let customGasPriceOptions = {};

    if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
        // Multiply by 5 for both maxFeePerGas and maxPriorityFeePerGas
        const fiveXMaxFeePerGas = (feeData.maxFeePerGas * BigInt(5));
        const fiveXMaxPriorityFeePerGas = (feeData.maxPriorityFeePerGas * BigInt(5));

        console.log(`Setting maxFeePerGas to 5x: ${ethers.formatUnits(fiveXMaxFeePerGas, "gwei")} Gwei`);
        console.log(`Setting maxPriorityFeePerGas to 5x: ${ethers.formatUnits(fiveXMaxPriorityFeePerGas, "gwei")} Gwei`);

        customGasPriceOptions = {
            maxFeePerGas: fiveXMaxFeePerGas,
            maxPriorityFeePerGas: fiveXMaxPriorityFeePerGas,
        };
    } else if (feeData.gasPrice) {
        // Legacy chain (older networks or if EIP-1559 data is not available)
        const fiveXGasPrice = (feeData.gasPrice * BigInt(5));
        console.log(`Setting legacy gasPrice to 5x: ${ethers.formatUnits(fiveXGasPrice, "gwei")} Gwei`);

        customGasPriceOptions = {
            gasPrice: fiveXGasPrice,
        };
    } else {
        throw new Error("Could not retrieve gas price data from the network.");
    }

    // 4. Define your transaction
    const transaction = {
        to: "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD",
        value: ethers.parseEther("0.001"), // Sending 0.001 ETH
        ...customGasPriceOptions, // Spread the calculated gas options here
    };

    console.log("Sending transaction with custom gas settings...");

    try {
        const txResponse = await wallet.sendTransaction(transaction);
        console.log("Transaction sent:", txResponse.hash);
        console.log("Waiting for transaction to be mined...");
        const txReceipt = await txResponse.wait();
        console.log("Transaction mined in block:", txReceipt.blockNumber);
        console.log("Transaction successful!");
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}

// Call the function
sendTransactionWithHigherGas();
