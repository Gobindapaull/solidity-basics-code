const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
);

const TX_HASH =
    "0x5d60b092e279236fadae42f182cd1cac567ad7cb8fb7dc43bb4d88f12f9a8096";

async function main() {

    // fetch tx
    const tx = await provider.getTransaction(TX_HASH);

    console.log("=== BASIC INFO ===");
    console.log("From:", tx.from);
    console.log("To:", tx.to);
    console.log("Value:", ethers.formatEther(tx.value), "BNB");
    console.log("Data:", tx.data);

    // first 4 bytes = function selector
    const selector = tx.data.slice(0, 10);

    console.log("\nFunction Selector:", selector);

    /*
        Example ABI
        Replace with target contract ABI
    */

    const abi = require("./ABI.json")

    const iface = new ethers.Interface(abi);

    try {

        const decoded = iface.parseTransaction({
            data: tx.data,
            value: tx.value
        });

        console.log("\n=== DECODED TX ===");

        console.log("Function:", decoded.name);

        console.log("Args:");

        decoded.args.forEach((arg, index) => {
            console.log(index, arg);
        });

    } catch (err) {

        console.log("\nCould not decode tx");
        console.log("Reason:", err.message);
    }

    // receipt
    const receipt = await provider.getTransactionReceipt(TX_HASH);

    console.log("\n=== RECEIPT ===");

    console.log("Status:", receipt.status);
    console.log("Gas Used:", receipt.gasUsed.toString());
}

main();


// BSC TX Decoder Bot


