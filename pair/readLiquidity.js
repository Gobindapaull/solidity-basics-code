const { ethers } = require("ethers");
require("dotenv").config();

const factoryAbi = [
    "function getPair(address tokenA, address tokenB) view returns (address)"
];

const pairAbi = [
    "function getReserves() view returns (uint112,uint112,uint32)",
    "function token0() view returns (address)",
    "function token1() view returns (address)"
];

const erc20Abi = [
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
];



const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const FACTORY = process.env.UNISWAP_FACTORY_ADDRESS;
const factory = new ethers.Contract(FACTORY, factoryAbi, provider);



async function main() {
    const pairAddress = await factory.getPair(process.env.WETH_ADDRESS, process.env.USDC_ADDRESS);
    console.log(`Pair: ${pairAddress}`);

    const pair = new ethers.Contract(pairAddress, pairAbi, provider);

    const [reserve0, reserve1] = await pair.getReserves();

    const reserve0Formatted = Number(
        ethers.formatUnits(reserve0, 6)
    );

    const reserve1Formatted = Number(
        ethers.formatUnits(reserve1, 18)
    );

    const ethPrice = reserve0Formatted / reserve1Formatted;

    console.log(`USDC Reserve: ${reserve0Formatted}`);
    console.log(`WETH Reserve: ${reserve1Formatted}`);
    console.log(`1 ETH = $${ethPrice}`);

    const token0 = await pair.token0();
    const token1 = await pair.token1();

    console.log("Token0 Address:", token0);
    console.log("Token1 Address:", token1);

    const token0Contract = new ethers.Contract(token0, erc20Abi, provider);
    const token1Contract = new ethers.Contract(token1, erc20Abi, provider);

    console.log(`Token0: ${await token0Contract.symbol()}`);
    console.log(`Token1: ${await token1Contract.symbol()}`);
}

main();
