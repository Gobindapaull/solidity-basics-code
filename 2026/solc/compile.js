const fs = require("fs");
const solc = require("solc")

console.log(solc.version()); // solidity version

// Read Solidity file
const source = fs.readFileSync("Simple.sol", "utf8");

// Standard JSON input
const input = {
    language: "Solidity",
    sources: {
        "Simple.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["abi", "evm.bytecode"],
            },
        },
    },
};

// Compile
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Get contract data
const contract = output.contracts["Simple.sol"]["Simple"];

console.log("ABI:");
console.log(contract.abi);

console.log("\nBytecode:");
console.log(contract.evm.bytecode.object);
