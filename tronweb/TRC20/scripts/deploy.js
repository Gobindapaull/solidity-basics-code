require("dotenv").config();

const { TronWeb } = require("tronweb");
const fs = require("fs");

const tronWeb = new TronWeb({
    fullHost: process.env.RPC_URL,
    privateKey: process.env.PRIVATE_KEY
});

async function main() {
    const artifact = JSON.parse(
        fs.readFileSync(
            "./artifacts/contracts/TRC20.sol/TRC20.json",
            "utf8"
        )
    );

    const owner = tronWeb.defaultAddress.base58;

    console.log("Deployer:", owner);

    const transaction = await tronWeb.transactionBuilder.createSmartContract(
        {
            abi: artifact.abi,
            bytecode: artifact.bytecode,
            feeLimit: 1000000000,
            callValue: 0,
            userFeePercentage: 100,
            originEnergyLimit: 10_000_000,
            parameters: ["1000000"]
        },
        owner
    );

    const signedTransaction =
        await tronWeb.trx.sign(transaction);

    const result =
        await tronWeb.trx.sendRawTransaction(signedTransaction);

    console.log("Transaction:", result.txid);

    if (!result.result) {
        throw new Error(
            `Transaction broadcast failed: ${JSON.stringify(result)}`
        );
    }

    console.log("Deployment transaction broadcast successfully.");
}

main().catch(console.error);
