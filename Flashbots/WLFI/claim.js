const ethers = require("ethers");
const FlashbotsBundleProvider = require("@flashbots/ethers-provider-bundle");
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;
const COMPROMISED_PK = process.env.PRIVATE_KEY;
const FUNDER_WALLET_PK = process.env.FUNDER_WALLET_PK;
const RECOVERY_ADDRESS = process.env.SAFE_ADDRESS;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
const CLAIM_ADDRESS = process.env.CLAIM_ADDRESS;
const CHAIN_ID = parseInt(process.env.CHAIN_ID);

if (!RPC_URL || !COMPROMISED_PK || !RECOVERY_ADDRESS || !TOKEN_ADDRESS) {
    console.error('Missing env vars. Fill RPC_URL, COMPROMISED_PRIVATE_KEY, RECOVERY_ADDRESS, TOKEN_ADDRESS');
    process.exit(1);
}

const erc20abi = require("./ERC20ABI.json");
const claimabi = require("./ClaimABI.json");

const provider = new ethers.JsonRpcProvider(RPC_URL, {
    name: "mainnet",
    chainId: CHAIN_ID
});

const compromisedWallet = new ethers.Wallet(COMPROMISED_PK, provider);
console.log(`Compromised wallet: ${compromisedWallet.address}`); // 0x43192E70054223D7B85F35480edFfD6423ee9204

const flashbotsSigner = ethers.Wallet.createRandom();

const funderWallet = new ethers.Wallet(FUNDER_WALLET_PK, provider);
console.log(`Funder wallet : ${funderWallet.address}`); // 0x19366A5929BD190b342E85d64034474e87f63234

const token = new ethers.Contract(TOKEN_ADDRESS, erc20abi, compromisedWallet);
const claim = new ethers.Contract(CLAIM_ADDRESS, claimabi, compromisedWallet)

provider.on("block", async () => {
    try {
        const DEFAULT_FLASHBOTS_RELAY = FlashbotsBundleProvider.DEFAULT_FLASHBOTS_RELAY;
        const flashbotsProvider = await FlashbotsBundleProvider.FlashbotsBundleProvider.create(provider, flashbotsSigner, DEFAULT_FLASHBOTS_RELAY);

        const [allocation, WLFI, claimable] = await Promise.all([
            claim.allocation(compromisedWallet.address), // 3592672046666666666666
            claim.WLFI(),
            claim.claimable(compromisedWallet.address) // 0
        ]);

        console.log(`Allocation of ${WLFI} : ${allocation}`);
        console.log(`Claimable amount : ${claimable}`);

        const [decimals, rawBalance, symbol] = await Promise.all([
            token.decimals(),
            token.balanceOf(compromisedWallet.address),
            token.symbol()
        ]);
        const humanBalance = ethers.formatUnits(rawBalance, decimals);

        console.log(`Token decimals: ${decimals}`); // 18
        console.log(`Balance on ${compromisedWallet.address}: ${humanBalance} ${symbol}`); // 0.0 WLFI

        if (claimable == 0n) {
            console.error("Claiming not available");
        }

        if (rawBalance == 0n) {
            console.error("No token balance to transfer");
        }

        // ---- Gas fee data (cache once) ----
        const feeData = await provider.getFeeData();

        // -------- Transaction 1: Fund compromised wallet with ETH --------
        const fundingAmount = ethers.parseEther("0.001"); // enough for gas
        const fundTx = {
            to: compromisedWallet.address,
            value: fundingAmount,
            nonce: await provider.getTransactionCount(funderWallet.address),
            gasLimit: 21001n,
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
            chainId: CHAIN_ID,
            type: 2
        };

        if (claimable == 0n) {
            console.log(`Don't send ETH to comprosmised wallet because claiming not available.`);
            return;
        } else {
            const signedFundTx = await funderWallet.signTransaction(fundTx);
            console.log(`Signed ETH Fund transaction : ${signedFundTx}`);
        }

        // -------- Transaction 2: Claim WLFI from compromised wallet --------
        const ifaceClaim = new ethers.Interface(claimabi);
        const claimData = ifaceClaim.encodeFunctionData("claim", []);

        const claimTx = {
            to: CLAIM_ADDRESS,
            data: claimData,
            nonce: await provider.getTransactionCount(compromisedWallet.address),
            gasLimit: 100000,
            maxFeePerGas: ethers.parseUnits("10", "gwei"),
            maxPriorityFeePerGas: ethers.parseUnits("3", "gwei"),
            chainId: CHAIN_ID,
            type: 2
        };

        const signedClaimTx = await compromisedWallet.signTransaction(claimTx);
        console.log(`Signed Claim raw transaction: ${signedClaimTx}`);

        // -------- Transaction 3: Transfer WLFI from compromised wallet --------
        const iface2 = new ethers.Interface(erc20abi);
        const data2 = iface2.encodeFunctionData("transfer", [RECOVERY_ADDRESS, rawBalance]);

        const tokenTx = {
            to: TOKEN_ADDRESS,
            data: data2,
            nonce: await provider.getTransactionCount(compromisedWallet.address) + 1,
            gasLimit: 100000,
            maxFeePerGas: ethers.parseUnits("10", "gwei"),
            maxPriorityFeePerGas: ethers.parseUnits("3", "gwei"),
            chainId: CHAIN_ID,
            type: 2
        };


        //  Sign the transaction with compromised key to produce a raw tx
        const signedTokenTx = await compromisedWallet.signTransaction(tokenTx);
        console.log(`Signed Token raw transaction: ${signedTokenTx}`);


        // -------- Build Flashbots Bundle --------
        const signedBundle = [
            { signer: funderWallet, transaction: fundTx },
            { signer: compromisedWallet, transaction: claimTx },
            { signer: compromisedWallet, transaction: tokenTx }
        ];

        const currentBlock = await provider.getBlockNumber();
        const targetBlock = currentBlock + 1;

        console.log(`Submitting bundle for block ${targetBlock} (current: ${currentBlock})`);

        const bundleResponse = await flashbotsProvider.sendBundle(signedBundle, targetBlock);


        if ('error' in bundleResponse) {
            console.error('Flashbots RPC error:', bundleResponse.error);
        }

        // Wait for inclusion
        const waitResponse = await bundleResponse.wait();
        console.log(`Bundle response : ${waitResponse}`);

        const receipts = await bundleResponse.receipts();
        console.log(receipts);


    } catch (error) {
        console.log(error);
    }
})

