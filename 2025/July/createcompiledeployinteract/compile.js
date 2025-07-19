const fs = require("fs");
const solc = require("solc");

const contractFilePath = "./EventLogger.sol";
const outputDir = "./build";

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const source = fs.readFileSync(contractFilePath, 'utf8');

const input = {
    language: "Solidity",
    sources: {
        "EventLogger.sol": {
            content: source
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ['abi', 'evm.bytecode.object']
            }
        }
    }
}

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
    output.errors.forEach((err) => {
        console.error(err.formattedMessage);
    })
}

for (const contractName in output.contracts["EventLogger.sol"]) {
    const contract = output.contracts["EventLogger.sol"][contractName];
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    fs.writeFileSync(`${outputDir}/${contractName}.json`, JSON.stringify(abi, null, 2));

    const bytecodeJson = {
        bytecode
    }

    fs.writeFileSync(`${outputDir}/${contractName}.bytecode.json`, JSON.stringify(bytecodeJson, null, 2));

    console.log(`${contractName} compiled successfully. ABI and bytecode saved to ${outputDir}`);
}
