
const fs = require('fs');
const solc = require('solc');

const contractFilePath = './AutoETH.sol';
const outputDir = './build';


if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Read the Solidity file
const source = fs.readFileSync(contractFilePath, 'utf8');

// Set up input for Solidity compiler
const input = {
    language: 'Solidity',
    sources: {
        'AutoETH.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode.object']
            }
        }
    }
};

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Error handling for compilation errors
if (output.errors) {
    output.errors.forEach((err) => {
        console.error(err.formattedMessage);
    });
}

// Save ABI and bytecode
for (const contractName in output.contracts['AutoETH.sol']) {
    const contract = output.contracts['AutoETH.sol'][contractName];
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    // Save ABI
    fs.writeFileSync(
        `${outputDir}/${contractName}.json`,
        JSON.stringify(abi, null, 2)
    );

    // Save Bytecode in JSON format
    const bytecodeJson = {
        bytecode: bytecode
    };

    fs.writeFileSync(
        `${outputDir}/${contractName}.bytecode.json`,
        JSON.stringify(bytecodeJson, null, 2)
    );

    console.log(`${contractName} compiled successfully. ABI and Bytecode saved to ${outputDir}/`);
}
