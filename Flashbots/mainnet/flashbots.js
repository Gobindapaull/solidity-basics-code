const ethers = require("ethers");
const FlashbotsBundleProvider = require("@flashbots/ethers-provider-bundle");
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;
const COMPROMISED_PK = process.env.PRIVATE_KEY;
const FUNDER_WALLET_PK = process.env.FUNDER_WALLET_PK;
const RECOVERY_ADDRESS = process.env.SAFE_ADDRESS;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
const CHAIN_ID = parseInt(process.env.CHAIN_ID);

if (!RPC_URL || !COMPROMISED_PK || !RECOVERY_ADDRESS || !TOKEN_ADDRESS) {
  console.error('Missing env vars. Fill RPC_URL, COMPROMISED_PRIVATE_KEY, RECOVERY_ADDRESS, TOKEN_ADDRESS');
  process.exit(1);
}

const erc20abi = require("./ERC20ABI.json");

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL, {
    name: "mainnet",
    chainId: CHAIN_ID
  });

  const compromisedWallet = new ethers.Wallet(COMPROMISED_PK, provider); // 0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD
  const flashbotsSigner = ethers.Wallet.createRandom();
  const funderWallet = new ethers.Wallet(FUNDER_WALLET_PK, provider);
  console.log(`Funder wallet : ${funderWallet.address}`); // 0xb700DaeA990aefBeDB36f109F9989Ab87A86601d

  const DEFAULT_FLASHBOTS_RELAY = FlashbotsBundleProvider.DEFAULT_FLASHBOTS_RELAY;
  const flashbotsProvider = await FlashbotsBundleProvider.FlashbotsBundleProvider.create(provider, flashbotsSigner, DEFAULT_FLASHBOTS_RELAY);
  // console.log(flashbotsProvider);

  const token = new ethers.Contract(TOKEN_ADDRESS, erc20abi, compromisedWallet);

  const [decimals, rawBalance, symbol] = await Promise.all([
    token.decimals(),
    token.balanceOf(compromisedWallet.address),
    token.symbol()
  ]);
  const humanBalance = ethers.formatUnits(rawBalance, decimals);

  console.log(`Token decimals: ${decimals}`);
  console.log(`Balance on ${compromisedWallet.address}: ${humanBalance} ${symbol}`);

  if (rawBalance == 0) {
    console.error("No token balance to transfer");
  }

  const feeData = await provider.getFeeData();

  const maxPriority = feeData.maxPriorityFeePerGas || feeData.gasPrice || ethers.utils.parseUnits('2', 'gwei');
  const maxFee = feeData.maxFeePerGas || feeData.gasPrice || ethers.utils.parseUnits('100', 'gwei');


  // -------- Transaction 1: Fund compromised wallet with ETH --------
  const fundingAmount = ethers.parseEther("0.001"); // enough for gas
  const fundTx = {
    to: compromisedWallet.address,
    value: fundingAmount,
    nonce: await provider.getTransactionCount(funderWallet.address),
    gasLimit: 21001n,
    maxFeePerGas: (await provider.getFeeData()).maxFeePerGas,
    maxPriorityFeePerGas: (await provider.getFeeData()).maxPriorityFeePerGas,
    chainId: CHAIN_ID,
    type: 2
  };
  const signedFundTx = await funderWallet.signTransaction(fundTx);
  console.log(`Signed ETH Fund transaction : ${signedFundTx}`);
  // const signedFundTxRes = await signedFundTx.wait();
  // console.log(`Funding ${fundingAmount} ETH done: ${signedFundTxRes.hash}`);

  // -------- Transaction 2: Transfer USDT from compromised wallet --------
  const iface = new ethers.Interface(erc20abi);
  const data = iface.encodeFunctionData("transfer", [RECOVERY_ADDRESS, rawBalance]);

  const gasEstimate = await provider.estimateGas({
    to: TOKEN_ADDRESS,
    from: compromisedWallet.address,
    data
  });

  console.log(gasEstimate); // 40766n

  const tokenTx = {
    to: TOKEN_ADDRESS,
    data,
    nonce: await provider.getTransactionCount(compromisedWallet.address),
    gasLimit: gasEstimate,
    maxFeePerGas: ethers.parseUnits("10", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
    chainId: CHAIN_ID,
    type: 2
  };

  // Sign the transaction with compromised key to produce a raw tx
  const signedTokenTx = await compromisedWallet.signTransaction(tokenTx);
  console.log(`Signed Token raw transaction: ${signedTokenTx}`);

  const currentBlock = await provider.getBlockNumber();
  const targetBlock = currentBlock + 1;

  const signedBundle = [
    { signer: funderWallet, transaction: fundTx },
    { signer: compromisedWallet, transaction: tokenTx }
  ];

  console.log(`Submitting bundle for block ${targetBlock} (current: ${currentBlock})`);

  const bundleResponse = await flashbotsProvider.sendBundle(signedBundle, targetBlock);
  // const sim = await bundleResponse.simulate();
  // console.log(`Simulation : ${JSON.stringify(sim, null, 2)}`);

  if ('error' in bundleResponse) {
    console.error('Flashbots RPC error:', bundleResponse.error);
  }

  // Wait for inclusion
  const waitResponse = await bundleResponse.wait();
  console.log(`Bundle response : ${waitResponse}`);

  // const receipts = await bundleResponse.receipts();
  // console.log(receipts);


}

main();

