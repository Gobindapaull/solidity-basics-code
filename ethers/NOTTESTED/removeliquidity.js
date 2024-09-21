const ethers = require("ethers");
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
const wallet = new ethers.Wallet("0x7cf435a576f7e9e3a2fd4eab169402f7da9359ac6455c0cc77c0ac7309e4725a", provider);

const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const ROUTER_ABI = require("./RouterABI.json");

const TOKEN_A_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const TOKEN_B_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const LP_TOKEN_ADDRESS = "";
const LP_ABI = require("./LPABI.json");

const uniswapContract = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, ROUTER_ABI, wallet);

async function removeLiquidity(amount) {
    const amountAMin = 0;
    const amountBMin = 0;
    const to = wallet.address;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    const lpContract = new ethers.Contract(LP_TOKEN_ADDRESS, LP_ABI, wallet);

    await lpContract.approve(UNISWAP_ROUTER_ADDRESS, amount)

    const tx = await uniswapContract.removeLiquidity(
        TOKEN_A_ADDRESS,
        TOKEN_B_ADDRESS,
        amount,
        amountAMin,
        amountBMin,
        to,
        deadline,
        { gasLimit: 200000 }
    );

    console.log(`Transaction hash : ${tx.hash}`);
    await tx.wait();
    console.log(`Transaction confirmed :)`);
}

removeLiquidity(ethers.parseUnits("1", 18))
