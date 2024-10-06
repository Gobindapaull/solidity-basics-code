const ethers = require('ethers');
const { FlashbotsBundleProvider } = require("@flashbots/ethers-provider-bundle");

const RPC_URL = "https://rpc.ankr.com/eth";
const FLASHBOTS_RPC = "https://relay.flashbots.net";
const PRIVATE_KEY = "0x87585b10ead3f1f58c9d3a9722663d9d295cdf3ba44ad0b0e249e6ff810dc9bc";
const TOKEN_ADDRESS = ""
const amount = ethers.parseUnits("2", 18);

const ABI = [
    "function claim(uint256 amount)"
];
const contract = new ethers.Interface(ABI);
const data = contract.encodeFunctionData("claim", [amount]);


const main = async () => {
    try {
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

        const flashbotsProvider = await FlashbotsBundleProvider.create(
            provider,
            wallet,
            FLASHBOTS_RPC
        );
        const nonce = await wallet.getNonce();
        const gasPrice = (await provider.getFeeData()).gasPrice;

        // claim token transaction
        const claimTokenTx = {
            to: TOKEN_ADDRESS,
            data: data,
            nonce: nonce,
            gasLimit: 150000,
            gasPrice: gasPrice
        };

        const bundle = [claimTokenTx];

        // send the bundle
        const tx = await flashbotsProvider.sendBundle(bundle, await provider.getBlockNumber() + 1);

        console.log(`Bundle sent! Hash: ${tx.bundleHash}`);
    } catch (error) {
        console.log(error);
    }
}

main();
