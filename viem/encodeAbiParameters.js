const { encodeAbiParameters, parseAbiParameters } = require("viem");

const encoded = encodeAbiParameters(
    parseAbiParameters(
        "string, string, uint8, uint256, address, bool, bool, bool"
    ),
    [
        "MyToken",           // name
        "MTK",               // symbol
        18,                  // decimals (uint8)
        BigInt("1000000000000000000000000000"), // initialSupply (1B × 10^18)
        "0x1111111111111111111111111111111111111111",
        true,                // antiBot
        true,                // antiWhale
        false                // airdrop
    ]
);

const argsForBscScan = encoded.replace("0x", "");

console.log(argsForBscScan);
