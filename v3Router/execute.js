const ethers = require("ethers");

const url = "https://bsc-dataseed.binance.org";
const privateKey = "" // wallet private key
const tokenAddress = "0x1012D033FF807bEff9c20140062C52f9F8DE3B74";
const dexAddress = "0x1A0A18AC4BECDDbd6389559687d1A73d8927E416";
const wbnbAddress = "0x55d398326f99059fF775485246999027B3197955";

const provider = new ethers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey, provider);

const erc20ABI = require("./ABI.json");
const dexABI = require("./DexABI.json");

const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, wallet);
const dexContract = new ethers.Contract(dexAddress, dexABI, wallet);



async function executeTransaction() {
    // Encode the commands
    const commands = "0x01"; // Example: single swap operation

    // Encode the inputs for the swap
    const tokenIn = tokenAddress;
    const tokenOut = wbnbAddress;
    const amountIn = ethers.parseUnits("25000", 18); // 1 token
    const amountOutMinimum = 0; // No slippage protection for simplicity
    const recipient = wallet.address;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10-minute deadline

    const inputs = [
        ethers.AbiCoder.defaultAbiCoder().encode(
            ["address", "address", "uint256", "uint256", "address"],
            [tokenIn, tokenOut, amountIn, amountOutMinimum, recipient]
        )
    ];

    // Call the execute function
    const tx = await dexContract["execute(bytes,bytes[],uint256)"](commands, inputs, deadline, { gasLimit: 300000 });

    console.log("Transaction hash:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
}

executeTransaction();
