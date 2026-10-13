require("dotenv").config()
const ethers = require("ethers")

const CHAIN_ID = 11155111n
const POOL_MANAGER = "0xE03A1074c86CFeDd5C142C4F04F1a1536e203543";
const STATE_VIEW = "0xe1dd9c3fa50edb962e442f60dfbc432e24537e4c";
const USDC = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const USDC_ABI = [
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
]
const stateViewAbi = [
    "function getSlot0(bytes32 poolId) view returns (uint160 sqrtPriceX96, int24 tick, uint24 protocolFee, uint24 lpFee)",
    "function getLiquidity(bytes32 poolId) view returns (uint128 liquidity)"
];
const ZERO = ethers.ZeroAddress
console.log(`Zero address: ${ZERO}`)

function getPoolId(currency0, currency1, fee, tickSpacing, hooks) {
    const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
        ["address", "address", "uint24", "int24", "address"],
        [currency0, currency1, fee, tickSpacing, hooks]
    );

    return ethers.keccak256(encoded);
}

async function main() {
    if (!process.env.RPC_URL) {
        throw new Error("Set RPC_URL in .env")
    }
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const network = await provider.getNetwork()

    if (network.chainId !== CHAIN_ID) {
        throw new Error("RPC is not connected to Sepolia")
    }

    const usdc = new ethers.Contract(USDC, USDC_ABI, provider)
    console.log(`Token: ${await usdc.symbol()}`)
    console.log(`Decimals: ${await usdc.decimals()}`)

    const state = new ethers.Contract(
        STATE_VIEW,
        stateViewAbi,
        provider
    );

    const candidates = [
        [100, 1],
        [500, 10],
        [3000, 60],
        [10000, 200]
    ];

    const hooks = ZERO;

    for (const [fee, tickSpacing] of candidates) {
        const poolId = getPoolId(
            ZERO, USDC, fee, tickSpacing, hooks
        );

        try {
            const [slot0, liquidity] = await Promise.all([
                state.getSlot0(poolId),
                state.getLiquidity(poolId)
            ]);

            const initialized = slot0.sqrtPriceX96 !== 0n;
            const hasLiquidity = liquidity > 0n;

            console.log({
                fee,
                tickSpacing,
                hooks,
                poolId,
                initialized,
                sqrtPriceX96: slot0.sqrtPriceX96.toString(),
                tick: slot0.tick.toString(),
                liquidity: liquidity.toString(),
                hasLiquidity
            });

            if (initialized && hasLiquidity) {
                console.log(
                    "Candidate found. Quote it before considering a swap."
                );
            }
        } catch (error) {
            console.log(
                `Candidate ${fee}/${tickSpacing} could not be read:`,
                error.shortMessage || error.message
            );
        }
    }
}

main()
