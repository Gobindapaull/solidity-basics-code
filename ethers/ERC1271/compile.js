const fs = require("fs");
const path = require("path");
const solc = require("solc");

// Prepare Solidity compiler input
const input = {
  language: "Solidity",
  sources: {
    "ContractWallet.sol": {
      content: fs.readFileSync("ContractWallet.sol", "utf8"),
    },
    "ECDSA.sol": {
      content: fs.readFileSync("ECDSA.sol", "utf8"),
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

// Run compiler
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Create build folder if not exists
const buildDir = path.resolve(__dirname, "build");
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

// Save each contract's ABI & bytecode
for (const source in output.contracts) {
  for (const contractName in output.contracts[source]) {
    const contract = output.contracts[source][contractName];
    const artifact = {
      abi: contract.abi,
      bytecode: contract.evm.bytecode.object,
    };

    const filePath = path.join(buildDir, `${contractName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(artifact, null, 2));

    console.log(`✔ Built ${contractName} → ${filePath}`);
  }
}
